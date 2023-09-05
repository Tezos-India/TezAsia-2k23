
import axios from "axios";

export const fetchStorage = async () => {
    const res = await axios.get(
        "https://api.ghostnet.tzkt.io/v1/contracts/KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6/storage/"
    );
    // console.log(res);
    return res.data;

};
