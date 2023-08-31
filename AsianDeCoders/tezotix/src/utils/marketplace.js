/* eslint-disable no-undef */
import config from "../config/config";
import axios from "axios";

export const hex2buf = (hex) => {
	return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
};

export function bytes2Char(hex) {
	return Buffer.from(hex2buf(hex)).toString("utf8");
}

export const mintNFT = ({ Tezos, token_id }) => {
	return async (dispatch) => {
		try {
			const voting_contract = await Tezos.wallet.at(config.voting);
			const FA2_contract = await Tezos.wallet.at(config.FA2);
			const batchOp = await Tezos.wallet
				.batch()
				.withContractCall(voting_contract.methods.art_mint(token_id))
				.withContractCall(
					FA2_contract.methods.update_operators([
						{
							add_operator: {
								owner: USER_ADDRESS,
								operator: config.marketplace,
								token_id: 0,
							},
						},
					])
				)
				.withContractCall(
					voting_contract.methods.ask([
						{
							amount: USER.amount,
							creator: USER.address,
							editions: 1,
							expiry_time: null,
							shares: [
								{ 0: Admin.amount, 1: Admin.address },
								{ 0: Curator.amount, 1: Curator.address },
							],
							token: { 0: config.marketplace, 1: token_id },
						},
					])
				)
				.send();
			await batchOp.confirmation();
		} catch (error) {
			throw error;
		}
	};
};
