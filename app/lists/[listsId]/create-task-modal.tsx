import { FC, useState } from "react";

import Icon from "@mdi/react";
import { mdiCalendar } from "@mdi/js";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import Modal from "@/components/modal";

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

   const onSubmit = (data: object) => {
      const msDate = new Date(selected).getTime().toString();
      const newData = { ...data, dueDate: msDate.slice(0, msDate.length - 3) };
      handleCreateTask(newData);
   };

   const [showCalendar, setShowCalendar] = useState(false);
   const [selected, setSelected] = useState<Date>();

   const handleShowCalendar = () => {
      setShowCalendar(!showCalendar);
   };

   let footer = <p>Please pick a day.</p>;
   if (selected) {
      footer = <p>You picked {format(selected, "PP")}.</p>;
   }

   return (
      <>
         <Modal closeModal={closeModal} header='Create Task' hasLine>
            {showCalendar && (
               <Modal closeModal={handleShowCalendar}>
                  <div className='flex flex-col items-center'>
                     <DayPicker
                        mode='single'
                        selected={selected}
                        onSelect={setSelected}
                        footer={footer}
                     />
                  </div>

                  <div className='flex flex-row justify-end mx-4'>
                     <button
                        className='btn btn-info hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
                        onClick={() => {
                           handleShowCalendar();
                        }}
                     >
                        OK
                     </button>
                  </div>
               </Modal>
            )}

            <form
               onSubmit={handleSubmit(onSubmit)}
               className='flex flex-col items-left justify-center mx-auto mt-4'
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

                  <div className='input-group'>
                     <button className='btn btn-square' type='button' onClick={handleShowCalendar}>
                        <Icon
                           path={mdiCalendar}
                           size={1}
                           className='mr-1 cursor-pointer'
                           color={"#b22e01"}
                        />
                     </button>

                     <input
                        {...register("dueDate")}
                        className='input input-bordered input-md w-2/3 max-w-xs'
                        placeholder='Due date'
                        value={selected ? format(selected, "PP") : ""}
                     />
                  </div>
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
      </>
   );
};

export default CreateTaskModal;
