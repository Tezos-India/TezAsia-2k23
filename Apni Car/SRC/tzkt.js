// TODO 8 - Fetch lottery contract storage

import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://better-call.dev/ghostnet/KT1M6C1CvfFqFoaY3C1VQgB7YmB85BS7VRJB/storage"
  );
  return res.data;
};