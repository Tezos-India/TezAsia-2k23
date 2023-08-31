(**
   This file implement the TZIP-12 protocol (a.k.a FA2) for NFT on Tezos
   copyright Wulfman Corporation 2021
*)

#import "errors.mligo" "Errors"
#import "operators.mligo" "Operators"
#import "tokenMetadata.mligo" "TokenMetadata"
#import "ledger.mligo" "Ledger"
#import "storage.mligo" "Storage"

type storage = Storage.t

(** transfert entrypoint
*)
type atomic_trans = [@layout:comb] {
   to_      : address;
   token_id : nat;
   amount   : nat;
}

type transfer_from = {
   from_ : address;
   txs   : atomic_trans list
}
type transfer = transfer_from list

let transfer (type a) (t:transfer) (s: a storage) : operation list * a storage =
   (* This function process the "tx" list. Since all transfer share the same "from_" address, we use a se *)
   let process_atomic_transfer (from_:address) (ledger, t:Ledger.t * atomic_trans) =
      let {to_;token_id=_token_id;amount=amount_} = t in
      let ()     = Operators.assert_authorisation s.operators from_ in
      let ledger = Ledger.decrease_token_amount_for_user ledger from_ amount_ in
      let ledger = Ledger.increase_token_amount_for_user ledger to_   amount_ in
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

(** balance_of entrypoint
*)
type request = {
   owner    : address;
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

let balance_of (type a) (b: balance_of) (s: a storage) : operation list * a storage =
   let {requests;callback} = b in
   let get_balance_info (request : request) : callback =
      let {owner;token_id=_token_id} = request in
      let balance_ = Storage.get_amount_for_owner s owner    in
      {request=request;balance=balance_}
   in
   let callback_param = List.map get_balance_info requests in
   let operation = Tezos.transaction callback_param 0tez callback in
   ([operation]: operation list),s

(** update operators entrypoint *)
(**
(list %update_operators
  (or
    (pair %add_operator
      (address %owner)
      (pair
        (address %operator)
        (nat %token_id)
      )
    )
    (pair %remove_operator
      (address %owner)
      (pair
        (address %operator)
        (nat %token_id)
      )
    )
  )
)
*)
type operator = [@layout:comb] {
   owner    : address;
   operator : address;
   token_id : nat;
}

type unit_update      = Add_operator of operator | Remove_operator of operator
type update_operators = unit_update list
(**
Add or Remove token operators for the specified token owners and token IDs.


The entrypoint accepts a list of update_operator commands. If two different
commands in the list add and remove an operator for the same token owner and
token ID, the last command in the list MUST take effect.


It is possible to update operators for a token owner that does not hold any token
balances yet.


Operator relation is not transitive. If C is an operator of B and if B is an
operator of A, C cannot transfer tokens that are owned by A, on behalf of B.


*)
let update_ops (type a) (updates: update_operators) (s: a storage) : operation list * a storage =
   let update_operator (operators,update : Operators.t * unit_update) = match update with
      Add_operator    {owner=owner;operator=operator;token_id=_token_id} -> Operators.add_operator    operators owner operator
   |  Remove_operator {owner=owner;operator=operator;token_id=_token_id} -> Operators.remove_operator operators owner operator
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
