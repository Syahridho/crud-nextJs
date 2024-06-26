import { useEffect, useRef } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutSide = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.addEventListener("mousedown", handleClickOutSide);
    };
  }, [onClose]);
  return (
    <div className="fixed w-screen h-screen z-50 bg-black bg-opacity-60 flex justify-center items-center top-0">
      <div
        className="bg-white p-5 rounded w-[90vw] max-h-[80vh] border overflow-auto sm:w-[40vw] sm:p-8"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
