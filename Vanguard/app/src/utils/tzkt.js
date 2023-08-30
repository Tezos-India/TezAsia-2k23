import axios from "axios";

export const fetchStorage = async () => {
    const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT1Q6WTWL1n2NjZrUM42dvy1qMuqgyGHTZca/storage");
    return res.data;
}

export const fetchStoryTitle = async (addr) => {
    const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${addr}/storage`);
    return res.data.title;
}

export const fetchStoryStorage = async (addr) => {
    const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${addr}/storage`);
    return res.data; 
}