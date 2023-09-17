import axios from "axios";
import { contractAddr } from "./constants";

export const fetchStorage = async () => {
    const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${contractAddr}/storage`);
    return res;
}

export const fetchLeaderboard = async () => {
    const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${contractAddr}/storage`);
    return res.data.leaderboard;
}

// export const fetchStoryTitle = async () => {
//     const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/KT1BCWtdQrNJZKZySxKRam2DZ7UDE4xkr1Bb/storage`);
//     return res.data.title;
// }
