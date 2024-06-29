import Modal from "@/components/ui/Modal";
import crudServices from "@/services/crud";
import { FaCircleNotch } from "react-icons/fa6";
import { Crud } from "@/types/crud.type";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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
        <Input title="Activity" type="text" name="name" />
        <Input title="Time Start" type="datetime-local" name="timeStart" />
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
          <Input title="Time End" type="datetime-local" name="timeEnd" />
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
          <Button
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
          </Button>
          <Button
            type="button"
            className="bg-red-500 py-1.5 px-2 text-white rounded shadow"
            onClick={() => setModalCreate(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreate;
