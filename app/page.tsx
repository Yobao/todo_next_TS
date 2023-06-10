"use client";
import { useEffect, useState } from "react";
import work from "../public/work.jpg";

export default function Home() {
   const [data, setData] = useState();

   return (
      <div className='card w-80 bg-base-100 shadow-xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer'>
         <figure>
            <img src='/work.jpg' alt='work' />
         </figure>
         <div className='card-body'>
            <h2 className='card-title'>Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className='card-actions justify-end'>
               <button className='btn btn-primary'>Buy Now</button>
            </div>
         </div>
      </div>
   );
}
