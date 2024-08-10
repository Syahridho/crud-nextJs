import { retrieveDataByName } from "@/lib/firebase/services";

export const getSearch = async (name: string) => {
  const data = await retrieveDataByName("crud", "name", name);
  return data;
};
