// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios";

export const fetchStorage =async () => {
    const res = await axios.get(
        "https://api.ghostnet.tzkt.io/v1/contracts/KT1Na3Ewa9fodgAcut79fkSsh5kUiKgjNxYN/storage"
    )
    return res.data;
}