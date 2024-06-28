import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import ModalCreate from "./ModalCreate";
import { Crud } from "@/types/crud.type";
import { FaRegTrashCan, FaFilePen } from "react-icons/fa6";
import ModalUpdate from "./ModalUpdate";
import { conversiTime } from "@/utils/conversiTime";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

type PropTypes = {
  crudDatas: any;
};

const CrudView = (props: PropTypes) => {
  const { crudDatas } = props;

  const [crudData, setCrudData] = useState<Crud[]>([]);
  const [modalCreate, setModalCreate] = useState<Boolean | undefined>(false);
  const [modalUpdate, setModalUpdate] = useState<Crud | {}>({});
  const [modalDelete, setModalDelete] = useState<Crud | {}>({});

  useEffect(() => {
    setCrudData(crudDatas);
  }, [crudDatas]);
  return (
    <>
      <div className={`${poppins.className} h-full`}>
        <div className="mx-auto max-w-[1000px] mt-10">
          <div className="bg-white border rounded p-8 flex justify-between  items-end">
            <input type="text" className="border p-1.5" />
            <button
              className="bg-slate-800 text-white px-4 py-2 rounded text-base"
              onClick={() => setModalCreate(true)}
            >
              Add Activity ass
            </button>
          </div>

          <table className="table-auto border-collapse border text-center bg-white text-slate-800 my-4 w-full">
            <thead>
              <tr>
                <th className="border py-2">Activity Name</th>
                <th className="border py-2">Start Time</th>
                <th className="border py-2">End Time</th>
                <th className="border py-2">Status</th>
                <th className="border py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {crudData.map((crudData: any) => (
                <tr key={crudData.id}>
                  <td className="border py-2">{crudData.name}</td>
                  <td className="border py-2">
                    {conversiTime(crudData.timeStart)}
                  </td>
                  <td className="border py-2">
                    {crudData.timeEnd
                      ? conversiTime(crudData.timeEnd)
                      : "Belum Selesai"}
                  </td>
                  <td className="border py-2">{crudData.status}</td>
                  <td className="border py-2 flex justify-center gap-4">
                    <button
                      onClick={() => setModalDelete(crudData)}
                      className="p-2 bg-red-500 text-white rounded shadow"
                    >
                      <FaRegTrashCan />
                    </button>
                    <button
                      onClick={() => setModalUpdate(crudData)}
                      className="p-2 bg-blue-500 text-white rounded shadow"
                    >
                      <FaFilePen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalCreate && (
        <ModalCreate
          setModalCreate={setModalCreate}
          setCrudData={setCrudData}
        />
      )}
      {Object.keys(modalUpdate).length > 0 && (
        <ModalUpdate
          setModalUpdate={setModalUpdate}
          updateData={modalUpdate}
          setCrudData={setCrudData}
        />
      )}
    </>
  );
};

export default CrudView;
