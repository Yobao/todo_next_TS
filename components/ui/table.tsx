"use client";
import { FC } from "react";

import { TaskTableHeader } from "@/types";

interface pageProps {
   data: any;
   header: TaskTableHeader[];
}

const Table: FC<pageProps> = ({ data, header }) => {
   return (
      <div className=''>
         <table className='table'>
            <thead>
               <tr>
                  {header.map(({ key, text }) => (
                     <th key={key} className='text-center'>
                        {text}
                     </th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {data.map((row: any) => (
                  <tr
                     key={JSON.stringify(row)}
                     className='hover:scale-105 transition delay-100 duration-200 ease-in-out hover:bg-gray-100'
                  >
                     {header.map((cell) =>
                        cell?.component ? (
                           <th key={JSON.stringify(cell)} className='text-center'>
                              {cell.component({
                                 id: row.id,
                                 value: row[cell.key],
                              })}
                           </th>
                        ) : (
                           <td key={JSON.stringify(cell)} className='text-center'>
                              {row[cell.key]}
                           </td>
                        )
                     )}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;
