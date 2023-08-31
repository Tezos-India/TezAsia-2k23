// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation

import { tezos } from "./tezos";

export const openAdmission = async () => {
    try{
        const contract = await tezos.wallet.at("KT1Na3Ewa9fodgAcut79fkSsh5kUiKgjNxYN");
        const op = await contract.methods.OpenAdmission().send()
        await op.confirmation(1)
    }catch (error){
        throw error
    }
};

export const closeAdmission = async () => {
    try{
        const contract = await tezos.wallet.at("KT1Na3Ewa9fodgAcut79fkSsh5kUiKgjNxYN");
        const op = await contract.methods.CloseAdmission().send()
        await op.confirmation(1)
    }catch (error){
        throw error
    }
};

export const addStudent = async (name:string) => {
    try{
        const contract = await tezos.wallet.at("KT1Na3Ewa9fodgAcut79fkSsh5kUiKgjNxYN");
        const op = await contract.methods.AddStudent(name).send()
        await op.confirmation(1)
        alert("Data Added Sucessfully")
    }catch (error){
        throw error
    }
};


// TODO 10 - Call end_game entrypoint in the Lottery contract by completing endGameOperation

export const endGameOperation = async () => {
   
};
