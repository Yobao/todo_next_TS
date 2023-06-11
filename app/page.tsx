"use client";
import { useEffect, useState } from "react";

import RootLayout from "./layout";
import Container from "@/components/container";
import Content from "./content";
import LoadingButton from "@/components/ui/loading-button";
import { List } from "@/types";
import { LISTS } from "@/utils/calls";

export default function Home() {
   const [data, setData] = useState<List[]>();

   useEffect(() => {
      LISTS.list().then((data) => setData(data));
   }, []);

   if (!data) return <LoadingButton />;

   return (
      <RootLayout>
         <div className='py-8 px-8'>
            <Container horizontal={"left"}>
               <div className='flex-1'>
                  <h2 className='text-4xl font-extrabold dark:text-white mx-4'>Todo Lists</h2>
                  <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700' />
               </div>
            </Container>

            <Content data={data} />
         </div>
      </RootLayout>
   );
}
