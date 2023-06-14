/* eslint-disable react/no-array-index-key */
import React from "react";

type Props = {
   children: string | JSX.Element | JSX.Element[];
   horizontal?: string;
};

function Container({ children, horizontal }: Props) {
   return (
      <div
         className={`flex flex-row py-4 px-2 md:px-4 container justify-${
            horizontal ?? "center"
         } mx-auto`}
      >
         {React.cloneElement(children, { ...children.props })}
      </div>
   );
}

export default Container;
