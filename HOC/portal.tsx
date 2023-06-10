"use client";
import { FC, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
   children: any;
}

const Portal: React.FC<Props> = ({ children }) => {
   const el = document.createElement("div");
   const wrapper: React.RefObject<HTMLElement> = useRef(el);

   useEffect(() => {
      const current = wrapper.current as HTMLElement;
      current.setAttribute("id", "overlay");
      document.body.appendChild(current);

      return () => {
         document.body.removeChild(current);
      };
   }, []);

   if (!wrapper.current) {
      return <>{null}</>;
   }
   return createPortal(children, wrapper.current);
};

export default Portal;
