import CrudView from "@/components/view/crud";
import crudServices from "@/services/crud";
import { useEffect, useState } from "react";

export default function Home() {
  const [crudData, setCrudData] = useState([]);
  const getAllData = async () => {
    const { data } = await crudServices.getAll();
    setCrudData(data.data);
    console.log(crudData);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      <CrudView crudDatas={crudData} />
    </>
  );
}
