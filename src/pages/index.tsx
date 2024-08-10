import CrudView from "@/components/view/crud";
import crudServices from "@/services/crud";
import { useEffect, useState } from "react";

export default function Home() {
  const [crudData, setCrudData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllData = async () => {
    setIsLoading(true);
    const { data } = await crudServices.getAll();
    setCrudData(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      <CrudView crudDatas={crudData} isLoading={isLoading} />
    </>
  );
}
