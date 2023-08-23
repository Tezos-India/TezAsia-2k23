import axios from "axios";

export const fetchStorage = async () => {
	try {
		const res = await axios.get(
			"https://api.ghostnet.tzkt.io/v1/contracts/KT1LcSjT7KYfc3bkAv6o6cu2rPwgbwi5r49d/storage"
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};
