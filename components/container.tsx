/* eslint-disable react/no-array-index-key */
import React from "react";

type Props = {
   children: JSX.Element;
   horizontal?: string;
};

function Container({ children, horizontal }: Props) {
   return (
      <div
         className={`flex flex-row py-4 px-2 md:px-4 container justify-${
            horizontal ?? "center"
         } mx-auto`}
      >
         {children}
      </div>
   );
}

export default Container;
