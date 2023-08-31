// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation
import { tezos } from "./tezos";

export const fetchStorage = async (contractAddress) => {
  try {
    const response = await tezos.contract.at(contractAddress);
    return response.storage();
  } catch (error) {
    console.log(error);
  }
};

export const setElectionDetails = async (
  contractAddress,
  adminEmail,
  adminName,
  electionDescription,
  electionName,
  adminPhone
) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods
      .set_election_details(
        adminEmail,
        adminName,
        electionDescription,
        electionName,
        adminPhone
      )
      .send({
        amount: 0,
      });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const addCandidate = async (contractAddress, name, header, image) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods
      .add_candidate(header, image, name)
      .send({
        amount: 0,
      });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const StartElect = async (contractAddress) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods.start_election().send({
      amount: 0,
    });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};
export const EndElect = async (contractAddress) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods.end_election().send({
      amount: 0,
    });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const registerAsVoter = async (
  contractAddress,
  name,
  email,
  phone,
  voterIdno,
  currentPic,
  currentVoterCard
) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods
      .register_as_voter(
        currentPic,
        email,
        voterIdno,
        name,
        phone,
        currentVoterCard,
        voterIdno
      )
      .send({
        amount: 0,
      });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const verifyVoter = async (contractAddress, voterAddress) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods.verify_voter(voterAddress).send({
      amount: 0,
    });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const vote = async (contractAddress, candidateId) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods.vote(candidateId).send({
      amount: 0,
    });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const donete = async (contractAddress, amount) => {
  try {
    const contract = await tezos.wallet.at(contractAddress);
    const operation = await contract.methods.donate(amount).send({
      amount: amount,
    });
    await operation.confirmation(1);
    return operation;
  } catch (error) {
    console.log(error);
  }
};
