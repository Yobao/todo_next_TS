"use client";
import React, { FC } from "react";
import Portal from "@/HOC/portal";

interface Modal {
   children: JSX.Element;
   closeModal: Function;
   header: string;
   hasLine?: boolean;
}

const Modal: FC<Modal> = ({ children, closeModal, header, hasLine }) => {
   return (
      <Portal>
         <div
            className='absolute inset-y-0 w-full left-0 z-10 bg-gray-300 bg-opacity-50 flex items-center'
            onClick={(e) => e.target === e.currentTarget && closeModal()}
         >
            <div className='modal-box mx-auto flex flex-col z-50 h-fit '>
               <div className='flex flex-row my-4'>
                  <h2 className='text-2xl font-bold dark:text-white'>{header}</h2>
                  <button
                     onClick={() => closeModal()}
                     className='btn btn-lg btn-circle btn-ghost absolute right-2 top-4'
                  >
                     ✕
                  </button>
               </div>

               {hasLine && <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700' />}

               <div className='my-4'>{children}</div>
            </div>
         </div>
      </Portal>
   );
};

export default Modal;
