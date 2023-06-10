"use client";
import { useEffect, useState } from "react";

export default function Home(props) {
   const [data, setData] = useState();

   return (
      <div>
         <div className='card w-96 bg-base-100 shadow-xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer'>
            <div className='card-body'>
               <h2 className='card-title'>Shoes!</h2>
               <p>If a dog chews shoes whose shoes does he choose?</p>
               <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>Buy Now</button>
               </div>
            </div>
         </div>
      </div>
   );
}
