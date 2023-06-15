"use client";
import React, { FC } from "react";

type Props = {
   children: JSX.Element;
   title: string;
   onClick: Function;
};

export default function Card({ children, ...props }: Props) {
   const { title, onClick } = props;

   return (
      <div
         onClick={() => onClick()}
         className='card flex-1 bg-base-100 flex-grow shadow-xl m-4 hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer'
      >
         <div className='card-body'>
            {title && (
               <>
                  <h2 className='card-title'>{title}</h2>
                  <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700' />
               </>
            )}
            {React.cloneElement(children, { ...children.props })}
         </div>
      </div>
   );
}
