import axios from "axios";
import addresses from "../config/config";

export const fetchMoviesStorage = async () => {
	try {
		const res = await axios.get(
			`https://api.ghostnet.tzkt.io/v1/contracts/${addresses.movies}/storage`
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const fetchMarketplaceStorage = async () => {
	try {
		const res = await axios.get(
			`https://api.ghostnet.tzkt.io/v1/contracts/${addresses.marketplace}/storage`
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const fetchFA2Storage = async () => {
	try {
		const res = await axios.get(
			`https://api.ghostnet.tzkt.io/v1/contracts/${addresses.FA2}/storage`
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};
