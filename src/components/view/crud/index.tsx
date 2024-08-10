import { Poppins } from "next/font/google";
import { FormEvent, useEffect, useState } from "react";
import ModalCreate from "./ModalCreate";
import { Crud } from "@/types/crud.type";
import { FaRegTrashCan, FaFilePen, FaCircleNotch } from "react-icons/fa6";
import ModalUpdate from "./ModalUpdate";
import { conversiTime } from "@/utils/conversiTime";
import ModalDelete from "./ModalDelete";
import Button from "@/components/ui/Button";
import { getSearch } from "@/services/search";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

type PropTypes = {
  crudDatas: any;
  isLoading: boolean;
};

const CrudView = (props: PropTypes) => {
  const { crudDatas, isLoading } = props;

  const [crudData, setCrudData] = useState<Crud[]>([]);
  const [modalCreate, setModalCreate] = useState<Boolean | undefined>(false);
  const [modalUpdate, setModalUpdate] = useState<Crud | {}>({});
  const [modalDelete, setModalDelete] = useState<Crud | {}>({});

  const handleSearch = async (event: any) => {
    const results = await getSearch(event)
      .then((result) => {
        setCrudData(result);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(results);
  };

  useEffect(() => {
    setCrudData(crudDatas);
  }, [crudDatas]);
  return (
    <>
      <div className={`${poppins.className} w-screen h-screen`}>
        <div className="mx-auto  max-w-[1000px] p-2">
          <div className="bg-white border w-full rounded p-8 flex flex-col items-start gap-4 sm:justify-between sm:items-center sm:flex-row">
            <input
              type="text"
              name="search"
              className="border p-1.5"
              onChange={(e) => handleSearch(e.target.value)}
            />

            <Button
              type="button"
              className="bg-slate-800 text-white rounded text-base px-2 py-1.5"
              onClick={() => setModalCreate(true)}
            >
              Add Activity
            </Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center mt-12">
              <FaCircleNotch className="animate-spin text-slate-400" />
            </div>
          ) : crudData.length > 0 ? (
            <table className="border-collapse border text-center bg-white text-slate-800 my-4 w-full">
              <thead>
                <tr>
                  <th className="border py-2 px-2 text-xs sm:text-base">
                    Activity
                  </th>
                  <th className="border py-2 text-xs sm:text-base hidden sm:table-cell">
                    Start Time
                  </th>
                  <th className="border py-2 text-xs sm:text-base hidden sm:table-cell">
                    End Time
                  </th>
                  <th className="border py-2 text-xs sm:text-base">Status</th>
                  <th className="border py-2 px-2 text-xs sm:text-base">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {crudData.map((crudData: any) => (
                  <tr key={crudData.id}>
                    <td className="border py-2 text-xs sm:text-base">
                      {crudData.name}
                    </td>
                    <td className="border py-2 text-xs sm:text-base hidden sm:table-cell">
                      {conversiTime(crudData.timeStart)}
                    </td>
                    <td className="border py-2 text-xs sm:text-base hidden sm:table-cell">
                      {crudData.timeEnd
                        ? conversiTime(crudData.timeEnd)
                        : "Belum Selesai"}
                    </td>
                    <td className="border py-2">
                      {crudData.status === "done" ? (
                        <p className="bg-green-200 text-green-500 text-xs border inline border-green-500 px-3 rounded-full sm:text-sm">
                          Done
                        </p>
                      ) : crudData.status === "process" ? (
                        <p className="bg-yellow-200 text-yellow-500 text-xs border inline border-yellow-500 px-3 rounded-full sm:text-sm">
                          Process
                        </p>
                      ) : (
                        <p className="bg-red-200 text-red-500 text-xs border inline border-red-500 px-3 rounded-full sm:text-sm">
                          Cancel
                        </p>
                      )}
                    </td>
                    <td className="border py-2 flex justify-center gap-4">
                      <Button
                        type="button"
                        className="p-2 bg-red-500 text-white rounded shadow text-xs sm:text-base"
                        onClick={() => setModalDelete(crudData)}
                      >
                        <FaRegTrashCan />
                      </Button>
                      <Button
                        type="button"
                        className="p-2 bg-blue-500 text-white rounded shadow text-xs sm:text-base"
                        onClick={() => setModalUpdate(crudData)}
                      >
                        <FaFilePen />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-12 text-slate-500">Data Kosong</p>
          )}
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
      {Object.keys(modalDelete).length > 0 && (
        <ModalDelete
          setModalDelete={setModalDelete}
          deleteData={modalDelete}
          setCrudData={setCrudData}
        />
      )}
    </>
  );
};

export default CrudView;
