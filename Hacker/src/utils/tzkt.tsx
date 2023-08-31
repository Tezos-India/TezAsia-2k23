// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios"

export const fetchStorage = async() => {
	const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT196oSyVYUemUEH277cpTvAKYQEu4BfGRQf/storage");
	console.log(res.data);
	return res.data;
}


