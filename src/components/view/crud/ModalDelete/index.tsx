import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import crudServices from "@/services/crud";
import { Crud } from "@/types/crud.type";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";

type PropTypes = {
  setModalDelete: Dispatch<SetStateAction<Crud | {}>>;
  deleteData: Crud | any;
  setCrudData: Dispatch<SetStateAction<Crud | any>>;
};

const ModalDelete = (props: PropTypes) => {
  const { setModalDelete, deleteData, setCrudData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const result = await crudServices.delete(deleteData.id);
    if (result.status === 200) {
      setIsLoading(false);
      setModalDelete({});
      const { data } = await crudServices.getAll();
      setCrudData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setModalDelete({})}>
      <h1 className="font-bold text-xl">Sure you want to Delete Data?</h1>
      <p>{deleteData.name}</p>
      <div className="mt-6 flex gap-2">
        <Button
          type="button"
          className="bg-blue-500 py-1.5 px-2 text-white rounded shadow"
          onClick={() => handleDelete()}
        >
          {isLoading ? (
            <>
              <FaCircleNotch className="animate-spin inline-block mb-1 me-1" />
              Loading...
            </>
          ) : (
            "Delete"
          )}
        </Button>
        <Button
          type="button"
          className="bg-red-500 py-1.5 px-2 text-white rounded shadow"
          onClick={() => setModalDelete(false)}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
