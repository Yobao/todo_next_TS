import { FC } from "react";
import Modal from "@/components/modal";

interface pageProps {
   action: Function;
   closeModal: Function;
}

const DeleteTaskModal: FC<pageProps> = ({ closeModal, action }) => {
   return (
      <Modal closeModal={closeModal} header='Delete Task' hasLine>
         <p>Are you sure you want to delete task ?</p>

         <div className='mt-3 flex justify-between mt-8'>
            <button
               className='btn btn-error hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
               onClick={action}
            >
               Delete
            </button>

            <button
               className='btn hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
               onClick={closeModal}
            >
               Cancel
            </button>
         </div>
      </Modal>
   );
};

export default DeleteTaskModal;
