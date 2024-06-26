import Modal from "@/components/ui/Modal";
import { Crud } from "@/types/crud.type";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  setModalCreate: Dispatch<SetStateAction<Boolean | undefined>>;
  setCrudData: Dispatch<SetStateAction<Crud[] | undefined>>;
};

const ModalCreate = (props: Proptypes) => {
  const { setModalCreate, setCrudData } = props;
  return (
    <Modal onClose={() => setModalCreate(false)}>
      <h1 className="font-bold text-xl">Tambahkan Data</h1>
      <div className="flex flex-col my-2">
        <label htmlFor="name">Aktivitas</label>
        <input type="text" name="name" id="name" className="border p-1.5" />
      </div>
      <div className="flex flex-col my-2">
        <label htmlFor="timeStart">Jam mulai</label>
        <input
          type="datetime-local"
          name="timeStart"
          id="timeStart"
          className="border p-1.5"
        />
      </div>
      <div className="flex flex-col my-2">
        <label htmlFor="timeEnd">Jam Selesai</label>
        <input
          type="datetime-local"
          name="timeEnd"
          id="timeEnd"
          className="border p-1.5"
        />
      </div>
      <div className="flex flex-col my-2">
        <label htmlFor="status">Status</label>
        <select name="status" id="status" className="border p-1.5">
          <option value="done">Selesai</option>
          <option value="process">Proses</option>
          <option value="cancel">Batal</option>
        </select>
      </div>
      <div className="mt-6 flex gap-2">
        <button className="bg-blue-500 py-1.5 px-2 text-white rounded shadow">
          Tambahkan
        </button>
        <button
          className="bg-red-500 py-1.5 px-2 text-white rounded shadow"
          onClick={() => setModalCreate(false)}
        >
          Batalkan
        </button>
      </div>
    </Modal>
  );
};

export default ModalCreate;
