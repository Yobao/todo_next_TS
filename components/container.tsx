/* eslint-disable react/no-array-index-key */
import React from "react";

function Container({ children, horizontal }) {
   return (
      <div
         className={`flex flex-row py-4 px-2 md:px-4 container  justify-${
            horizontal ?? "center"
         } mx-auto`}
      >
         {React.cloneElement(children, { ...children.props })}
      </div>
   );
}

export default Container;
