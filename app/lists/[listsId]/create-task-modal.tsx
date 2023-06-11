import { FC } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { Datepicker, Input, initTE } from "tw-elements";
initTE({ Datepicker, Input });

interface pageProps {
   handleSubmit: Function;
   closeModal: Function;
}

const CreateTaskModal: FC<pageProps> = ({ closeModal, handleSubmit: handleCreateTask }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = (data: object) => handleCreateTask(data);

   return (
      <Modal closeModal={closeModal} header='Create Task'>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-left justify-center mx-auto mt-4 '
         >
            <div className='mb-6'>
               <label className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
                  Name
               </label>
               <input
                  {...register("name")}
                  className='input input-bordered input-md w-2/3 max-w-xs'
                  placeholder='Task name'
               />
            </div>

            <div className='mb-6'>
               <label className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
                  Due date
               </label>

               <input
                  {...register("dueDate")}
                  className='input input-bordered input-md w-2/3 max-w-xs'
                  placeholder='Due date'
               />
            </div>

            <div className='mb-6'>
               <label className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
                  Description
               </label>

               <textarea
                  {...register("description")}
                  placeholder='Bio'
                  className='textarea textarea-bordered textarea-sm w-2/3 '
               ></textarea>
            </div>

            <div className='mt-3 flex justify-between'>
               <button
                  className='btn hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
                  onClick={closeModal}
               >
                  Close
               </button>

               <input
                  type='submit'
                  value='Create task'
                  className='btn btn-success hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
               />
            </div>
         </form>
      </Modal>
   );
};

export default CreateTaskModal;
