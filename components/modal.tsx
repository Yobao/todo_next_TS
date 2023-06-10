"use client";
import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, showModal }) => {
   return (
      <div className='a h-80 z-50 bg-red-600'>
         <dialog id='my_modal_3' className='modal'>
            <form method='dialog' className='modal-box'>
               <button
                  onClick={showModal}
                  htmlFor='my-modal-3'
                  className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
               >
                  ✕
               </button>
               <h3 className='font-bold text-lg'>Create Task!</h3>
               <div>{children}</div>
            </form>
         </dialog>
      </div>
   );
};

export default Modal;
