import Modal from "@/components/ui/Modal";
import crudServices from "@/services/crud";
import { FaCircleNotch } from "react-icons/fa6";
import { Crud } from "@/types/crud.type";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setModalCreate: Dispatch<SetStateAction<Boolean | undefined>>;
  setCrudData: Dispatch<SetStateAction<Crud[]>>;
};

const ModalCreate = (props: Proptypes) => {
  const { setModalCreate, setCrudData } = props;

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
    const result = await crudServices.add(data);

    if (result.status === 200) {
      setIsLoading(false);
      setModalCreate(false);
      const { data } = await crudServices.getAll();
      setCrudData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setModalCreate(false)}>
      <h1 className="font-bold text-xl">Add Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
          <label htmlFor="name">Activity</label>
          <input type="text" name="name" id="name" className="border p-1.5" />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="timeStart">Time Start</label>
          <input
            type="datetime-local"
            name="timeStart"
            id="timeStart"
            className="border p-1.5"
          />
        </div>
        <div>
          <label htmlFor="checkTimeEnd">is Done?</label>
          <input
            type="checkbox"
            value={isEnd}
            onChange={() => setIsEnd(!isEnd)}
            className="ms-2"
          />
        </div>
        {isEnd && (
          <div className="flex flex-col my-2">
            <label htmlFor="timeEnd">Time End</label>
            <input
              type="datetime-local"
              name="timeEnd"
              id="timeEnd"
              className="border p-1.5"
            />
          </div>
        )}
        <div className="flex flex-col my-2">
          <label htmlFor="status">Status</label>
          <select name="status" id="status" className="border p-1.5">
            <option value="process">Process</option>
            <option value="done">Done</option>
            <option value="cancel">Cancel</option>
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
              "Add"
            )}
          </button>
          <button
            type="button"
            className="bg-red-500 py-1.5 px-2 text-white rounded shadow"
            onClick={() => setModalCreate(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreate;
