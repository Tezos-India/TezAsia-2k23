import axios from "axios";

export const fetchStorage = async () => {
    const res = await axios.get(
        "https://api.ghostnet.tzkt.io/v1/contracts/KT1JMMq7Gkci4Y8m96smeobtzdeEKtbJja5i/storage"
    );
    return res.data;
};