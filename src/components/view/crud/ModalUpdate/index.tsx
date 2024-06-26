import Modal from "@/components/ui/Modal";
import { Crud } from "@/types/crud.type";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  setModalUpdate: Dispatch<SetStateAction<Crud | {}>>;
  updateData: Crud | any;
  setCrudData: Dispatch<SetStateAction<Crud[] | undefined>>;
};

const ModalUpdate = (props: Proptypes) => {
  const { setModalUpdate, setCrudData, updateData } = props;
  return (
    <Modal onClose={() => setModalUpdate(false)}>
      <h1>Update Data</h1>
    </Modal>
  );
};

export default ModalUpdate;
