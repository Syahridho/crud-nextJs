import Modal from "@/components/ui/Modal";
import crudServices from "@/services/crud";
import { Crud } from "@/types/crud.type";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaCircleNotch } from "react-icons/fa6";

type Proptypes = {
  setModalUpdate: Dispatch<SetStateAction<Crud | {}>>;
  updateData: Crud | any;
  setCrudData: Dispatch<SetStateAction<Crud[]>>;
};

const ModalUpdate = (props: Proptypes) => {
  const { setModalUpdate, setCrudData, updateData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState<any>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form: any = event.target as HTMLFormElement;

    const data = {
      name: form.name.value,
      timeStart: form.timeStart.value,
      timeEnd: isEnd ? form.timeEnd.value : null,
      status: form.status.value,
    };

    const result = await crudServices.update(updateData.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setModalUpdate(false);
      const { data } = await crudServices.getAll();
      setCrudData(data.data);
      console.log(data.data);
    } else {
      setIsLoading(false);
      console.log("gagal");
    }
  };

  useEffect(() => {
    if (updateData.timeEnd) {
      setIsEnd(true);
    }
  }, [updateData]);
  return (
    <Modal onClose={() => setModalUpdate(false)}>
      <h1 className="font-bold text-xl">Perbarui Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
          <label htmlFor="name">Aktivitas</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={updateData.name}
            onChange={() => {}}
            className="border p-1.5"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="timeStart">Jam mulai</label>
          <input
            type="datetime-local"
            name="timeStart"
            id="timeStart"
            className="border p-1.5"
            defaultValue={updateData.timeStart}
            onChange={() => {}}
          />
        </div>
        <div>
          <label htmlFor="checkTimeEnd">Sudah Selesai?</label>
          <input
            type="checkbox"
            checked={isEnd}
            onChange={() => setIsEnd(!isEnd)}
            className="ms-2"
          />
        </div>
        {isEnd && (
          <div className="flex flex-col my-2">
            <label htmlFor="timeEnd">Jam Selesai</label>
            <input
              type="datetime-local"
              name="timeEnd"
              id="timeEnd"
              className="border p-1.5"
              defaultValue={updateData.timeEnd}
              onChange={() => {}}
            />
          </div>
        )}
        <div className="flex flex-col my-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            className="border p-1.5"
            defaultValue={updateData.status}
            onChange={() => {}}
          >
            <option value="process">Proses</option>
            <option value="done">Selesai</option>
            <option value="cancel">Batal</option>
          </select>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 py-1.5 px-2 text-white rounded shadow"
          >
            {isLoading ? (
              <>
                <FaCircleNotch className="animate-spin inline-block mb-1 me-1" />
                Loading...
              </>
            ) : (
              "Update"
            )}
          </button>
          <button
            type="button"
            className="bg-red-500 py-1.5 px-2 text-white rounded shadow"
            onClick={() => setModalUpdate(false)}
          >
            Batalkan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdate;
