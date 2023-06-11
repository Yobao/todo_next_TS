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

            {/*             <div
               className='relative mb-3'
               data-te-datepicker-init
               data-te-inline='true'
               data-te-input-wrapper-init
            >
               <input
                  type='text'
                  className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                  placeholder='Select a date'
               />
               <label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
                  Select a date
               </label>
            </div> */}

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
