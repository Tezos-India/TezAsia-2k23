// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios";
export const fetchStorage = async () => {
  try {
    const response = await axios.get(
      "https://api.ghostnet.tzkt.io/v1/contracts/KT1PTg6ibQh262Ur2ZPovy1rMXCqQ88ZsUaY/storage"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
