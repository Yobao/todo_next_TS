"use client";
import { FC } from "react";

import { Task, TaskTableHeader } from "@/types";

interface pageProps {
   data: Task[];
   header: TaskTableHeader[];
}

const Table: FC<pageProps> = ({ data, header }) => {
   return (
      <div className=''>
         <table className='table'>
            <thead>
               <tr>
                  {header.map(({ key, text }) => (
                     <th key={key}>{text}</th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {data.map((row) => (
                  <tr
                     key={JSON.stringify(row)}
                     className='hover:scale-105 transition delay-100 duration-200 ease-in-out hover:bg-gray-100 cursor-pointer'
                  >
                     {header.map((cell) =>
                        cell?.component ? (
                           <th key={JSON.stringify(cell)}>
                              {cell.component({ id: row.id, value: row[cell.key] })}
                           </th>
                        ) : (
                           <td key={JSON.stringify(cell)}>{row[cell.key]}</td>
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
