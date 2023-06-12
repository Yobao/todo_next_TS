import { FC } from "react";
import Modal from "@/components/modal";
import { Task } from "@/types";

interface pageProps {
   closeModal: Function;
   data: Task;
}

const DetailModal: FC<pageProps> = ({ closeModal, data }) => {
   return (
      <Modal closeModal={closeModal} header='Detail' hasLine>
         <p>{data.description}</p>

         <div className='mt-3 flex justify-between mt-8'>
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

export default DetailModal;
