"use client";
import { FC } from "react";

import { Task, TaskTableHeader } from "@/types";

interface pageProps {
   data: Task[];
   header: TaskTableHeader[];
}

const Table: FC<pageProps> = ({ data, header }) => {
   return (
      <div className='overflow-x-auto'>
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
                  <tr key={JSON.stringify(row)}>
                     {header.map((cell) =>
                        cell?.component ? (
                           <th key={JSON.stringify(cell)}>{cell.component(row[cell.key])}</th>
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
