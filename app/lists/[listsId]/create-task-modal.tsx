import { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-day-picker/dist/style.css";

import { CreateTaskForm } from "@/types";
import Modal from "@/components/modal";

interface pageProps {
   handleSubmit: Function;
   closeModal: Function;
}

const formSchema = z.object({
   taskName: z.string().min(1, "Task name is required").max(50),
   dueDate: z.coerce.date(),
   description: z.string().min(1, "Description is required").max(200),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreateTaskModal: FC<pageProps> = ({ closeModal, handleSubmit: handleCreateTask }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

   const onSubmit: SubmitHandler<FormSchemaType> = (data: CreateTaskForm) => {
      const newDate = new Date(data.dueDate);
      const newData = { ...data, dueDate: Math.floor(newDate.getTime() / 1000) };
      handleCreateTask(newData);
   };

   return (
      <Modal closeModal={closeModal} header='Create Task' hasLine>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-left justify-center mx-auto mt-4'
         >
            <div className='mb-6'>
               <label className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
                  Name
               </label>
               <input
                  type='text'
                  id='taskName'
                  {...register("taskName")}
                  className='input input-bordered input-md w-2/3 max-w-xs'
                  placeholder='Task name'
               />
               {errors.taskName && (
                  <span className='text-red-400 block mt-2'>{errors.taskName?.message}</span>
               )}
            </div>

            <div className='mb-6'>
               <label className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>
                  Due date
               </label>
               <input
                  type='date'
                  id='dueDate'
                  className='input input-bordered input-md w-2/3 max-w-xs'
                  placeholder='Due date'
                  {...register("dueDate")}
               />
               {errors.dueDate && (
                  <span className='text-red-400 block mt-2'>{errors.dueDate?.message}</span>
               )}
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

               {errors.description && (
                  <span className='text-red-400 block mt-2'>{errors.description?.message}</span>
               )}
            </div>

            <div className='mt-3 flex justify-between'>
               <button
                  className='btn hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
                  onClick={() => closeModal()}
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
