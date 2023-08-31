(**
   This file implement the TZIP-12 protocol (a.k.a FA2) for NFT on Tezos
   copyright Wulfman Corporation 2021
*)

#import "../common/errors.mligo" "Errors"

module Address = struct
   type t = address
   [@no_mutation] let equal (a : t) (b : t) = a = b
end

module Operators = struct
   type owner    = Address.t
   type operator = Address.t
   type token_id = nat
   type t = ((owner * operator), token_id set) big_map

(** if transfer policy is Owner_or_operator_transfer *)
   let assert_authorisation (operators : t) (from_ : Address.t) (token_id : nat) : unit =
      let sender_ = (Tezos.get_sender ()) in
      if (Address.equal sender_ from_) then ()
      else
      let authorized = match Big_map.find_opt (from_,sender_) operators with
         Some (a) -> a | None -> Set.empty
      in if Set.mem token_id authorized then ()
      else failwith Errors.not_operator
(** if transfer policy is Owner_transfer
   let assert_authorisation (operators : t) (from_ : Address.t) : unit =
      let sender_ = Tezos.sender in
      if (sender_ = from_) then ()
      else failwith Errors.not_owner
*)

(** if transfer policy is No_transfer
   let assert_authorisation (operators : t) (from_ : Address.t) : unit =
      failwith Errors.no_owner
*)

   let is_operator (operators, owner, operator, token_id : (t * Address.t * Address.t * nat)) : bool =
      let authorized = match Big_map.find_opt (owner,operator) operators with
         Some (a) -> a | None -> Set.empty in
      (owner = operator || Set.mem token_id authorized)

   let assert_update_permission (owner : owner) : unit =
      assert_with_error (Address.equal owner (Tezos.get_sender ())) Errors.only_sender_manage_operators
   (** For an administator
      let admin = tz1.... in
      assert_with_error (Tezos.sender = admiin) "Only administrator can manage operators"
   *)

   let add_operator (operators : t) (owner : owner) (operator : operator) (token_id : token_id) : t =
      if owner = operator then operators (* assert_authorisation always allow the owner so this case is not relevant *)
      else
         let () = assert_update_permission owner in
         let auth_tokens = match Big_map.find_opt (owner,operator) operators with
            Some (ts) -> ts | None -> Set.empty in
         let auth_tokens  = Set.add token_id auth_tokens in
         Big_map.update (owner,operator) (Some auth_tokens) operators

   let remove_operator (operators : t) (owner : owner) (operator : operator) (token_id : token_id) : t =
      if owner = operator then operators (* assert_authorisation always allow the owner so this case is not relevant *)
      else
         let () = assert_update_permission owner in
         let auth_tokens = match Big_map.find_opt (owner,operator) operators with
         None -> None | Some (ts) ->
            let ts = Set.remove token_id ts in
            [@no_mutation] let is_empty = Set.size ts = 0n in
            if is_empty then None else Some (ts)
         in
         Big_map.update (owner,operator) auth_tokens operators
end

module Ledger = struct
   type token_id = nat
   type owner = Address.t
   type t = (token_id,owner) big_map

   let is_owner_of (ledger:t) (token_id : token_id) (owner: Address.t) : bool =
      (** We already sanitized token_id, a failwith here indicated a patological storage *)
      let current_owner = Option.unopt (Big_map.find_opt token_id ledger) in
      Address.equal current_owner owner

   let assert_owner_of (ledger:t) (token_id : token_id) (owner: Address.t) : unit =
      assert_with_error (is_owner_of ledger token_id owner) Errors.ins_balance

   let transfer_token_from_user_to_user (ledger : t) (token_id : token_id) (from_ : owner) (to_ : owner) : t =
      let () = assert_owner_of ledger token_id from_ in
      let ledger = Big_map.update token_id (Some to_) ledger in
      ledger
end

module TokenMetadata = struct
   (**
      This should be initialized at origination, conforming to either
      TZIP-12 : https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#token-metadata
      or TZIP-16 : https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#contract-metadata-tzip-016
   *)
   (* with TZIP-12 *)
   type data = {token_id:nat;token_info:(string,bytes)map}
   type t = (nat,data) big_map

   let data0 = Map.literal [
      ("name", [%bytes {| "FA2 NFT 0" |}]);
      ("decimals", [%bytes {| "3" |}]);
   ]

   let init () : t = Big_map.literal [
      (0n, {token_id=0n;token_info=data0})
   ]

   let get_token_metadata (token_id : nat) (tm : t) =
      match Big_map.find_opt token_id tm with
        Some data -> data
      | None -> failwith Errors.undefined_token
end

#import "../common/metadata.mligo" "Metadata"

module Storage = struct
   type token_id = nat
   type t = {
      ledger : Ledger.t;
      operators : Operators.t;
      token_ids : token_id set;
      token_metadata : TokenMetadata.t;
      metadata : Metadata.t;
   }

   let is_owner_of (s:t) (owner : Address.t) (token_id : token_id) : bool =
      Ledger.is_owner_of s.ledger token_id owner

   let assert_token_exist (s:t) (token_id : nat) : unit  =
      let _ = Option.unopt_with_error (Big_map.find_opt token_id s.token_metadata)
         Errors.undefined_token in
      ()

   let set_ledger (s:t) (ledger:Ledger.t) = {s with ledger = ledger}

   let get_operators (s:t) = s.operators
   let set_operators (s:t) (operators:Operators.t) = {s with operators = operators}

   let get_balance (s : t) (owner : Address.t) (token_id : nat) : nat =
      let ()       = assert_token_exist s token_id in
      if is_owner_of s owner token_id then 1n else 0n

end


type storage = Storage.t

(** Transfer entrypoint *)
type atomic_trans = [@layout:comb] {
   to_      : Address.t;
   token_id : nat;
   amount : nat;
}

type transfer_from = {
   from_ : Address.t;
   txs   : atomic_trans list
}
type transfer = transfer_from list

let transfer (t:transfer) (s:storage) : operation list * storage =
   (* This function process the "txs" list. Since all transfer share the same "from_" address, we use a se *)
   let process_atomic_transfer (from_:Address.t) (ledger, t:Ledger.t * atomic_trans) =
      let {to_;token_id;amount} = t in
      if amount <> 1n then failwith Errors.wrong_amount
      else 
         let ()     = Storage.assert_token_exist s token_id in
         let ()     = Operators.assert_authorisation s.operators from_ token_id in
         let ledger = Ledger.transfer_token_from_user_to_user ledger token_id from_ to_ in
         ledger
   in
   let process_single_transfer (ledger, t:Ledger.t * transfer_from ) =
      let {from_;txs} = t in
      let ledger     = List.fold_left (process_atomic_transfer from_) ledger txs in
      ledger
   in
   let ledger = List.fold_left process_single_transfer s.ledger t in
   let s = Storage.set_ledger s ledger in
   ([]: operation list),s

type request = {
   owner    : Address.t;
   token_id : nat;
}

type callback = [@layout:comb] {
   request : request;
   balance : nat;
}

type balance_of = [@layout:comb] {
   requests : request list;
   callback : callback list contract;
}

(** Balance_of entrypoint *)
let balance_of (b: balance_of) (s: storage) : operation list * storage =
   let {requests;callback} = b in
   let get_balance_info (request : request) : callback =
      let {owner;token_id} = request in
      let balance_ = Storage.get_balance s owner token_id in
      {request=request;balance=balance_}
   in
   let callback_param = List.map get_balance_info requests in
   let operation = Tezos.transaction callback_param 0tez callback in
   ([operation]: operation list),s

(** Update_operators entrypoint *)
type operator = [@layout:comb] {
   owner    : Address.t;
   operator : Address.t;
   token_id : nat;
}
type unit_update      = Add_operator of operator | Remove_operator of operator
type update_operators = unit_update list

let update_ops (updates: update_operators) (s: storage) : operation list * storage =
   let update_operator (operators,update : Operators.t * unit_update) = match update with
      Add_operator    {owner=owner;operator=operator;token_id=token_id} -> Operators.add_operator    operators owner operator token_id
   |  Remove_operator {owner=owner;operator=operator;token_id=token_id} -> Operators.remove_operator operators owner operator token_id
   in
   let operators = Storage.get_operators s in
   let operators = List.fold_left update_operator operators updates in
   let s = Storage.set_operators s operators in
   ([]: operation list),s

(** If transfer_policy is  No_transfer or Owner_transfer
let update_ops : update_operators -> storage -> operation list * storage =
   fun (updates: update_operators) (s: storage) ->
   let () = failwith Errors.not_supported in
   ([]: operation list),s
*)


type parameter = [@layout:comb] | Transfer of transfer | Balance_of of balance_of | Update_operators of update_operators
let main (p : parameter) (s : storage) = 
  match p with
     Transfer         p -> transfer   p s
  |  Balance_of       p -> balance_of p s
  |  Update_operators p -> update_ops p s


[@view] let get_balance : ((Address.t * nat) * storage) -> nat =
   fun (p, s : (Address.t * nat) * storage) ->
      let (owner, token_id) = p in
      let balance_ = Storage.get_balance s owner token_id in
      balance_

[@view] let total_supply : (nat * storage) -> nat =
   fun ((token_id, s) : (nat * storage)) ->
      let () = Storage.assert_token_exist s token_id in
      1n

[@view] let all_tokens : (unit * storage) -> nat set =
   fun ((_, s) : (unit * storage)) -> s.token_ids

[@view] let is_operator : (operator * storage) -> bool =
   fun ((op, s) : (operator * storage)) ->
      Operators.is_operator (s.operators, op.owner, op.operator, op.token_id)

[@view] let token_metadata : (nat * storage) -> TokenMetadata.data =
   fun ((p, s) : (nat * storage)) ->
      TokenMetadata.get_token_metadata p s.token_metadata
