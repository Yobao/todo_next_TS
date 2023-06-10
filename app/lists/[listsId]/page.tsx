"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Icon from "@mdi/react";
import { mdiDelete, mdiMagnify } from "@mdi/js";

import Portal from "@/HOC/portal";
import Container from "@/components/container";
import Modal from "@/components/modal";
import Table from "@/components/ui/table";
import LoadingButton from "@/components/ui/loading-button";
import { TASKS } from "@/utils/calls";
import { Task } from "@/types";
import { convertDate } from "@/utils/utils";

interface pageProps {
   params: { listsId: string };
}

const tableHeader = [
   {
      key: "select",
      text: "Select",
      component: () => {
         return (
            <label>
               <input type='checkbox' className='checkbox' />
            </label>
         );
      },
   },
   { key: "name", text: "Task name" },
   {
      key: "dueDate",
      text: "Due date",
      component: (data: string) => {
         const convertedDate = convertDate(data);
         return <p>{convertedDate}</p>;
      },
   },
   {
      key: "detail",
      text: "Detail",
      component: () => {
         return (
            <button
               onClick={() => console.log("a")}
               className='bg-red hover:scale-125 transition delay-100 duration-300 ease-in-out cursor-pointer'
            >
               <Icon path={mdiMagnify} size={1} className='mr-1' />
            </button>
         );
      },
   },
   {
      key: "delete",
      text: "Delete",
      component: () => {
         return (
            <button
               onClick={() => console.log("a")}
               className='hover:scale-125 transition delay-100 duration-300 ease-in-out cursor-pointer'
            >
               <Icon path={mdiDelete} size={1} className='mr-1' color={"#b22e01"} />
            </button>
         );
      },
   },
];

const TaskList: FC<pageProps> = ({ params }) => {
   const router = useRouter();
   const pathName = usePathname();
   const [data, setData] = useState<Task[]>();
   const [createModal, setCreateModal] = useState(false);

   useEffect(() => {
      TASKS.list(params.listsId).then((data) => setData(data));
   }, []);

   const handleShowCreateModal = () => {
      setCreateModal(true);
   };

   const handleCloseCreateModal = () => {
      setCreateModal(false);
   };

   if (!data) return <LoadingButton />;

   return (
      <>
         <div className='my-8 mx-8'>
            <Container>
               <div className='mx-auto'>
                  <button onClick={handleShowCreateModal}>Show modal</button>
                  <Table header={tableHeader} data={data} />
                  {createModal && (
                     <Portal>
                        <Modal showModal={handleCloseCreateModal} />
                     </Portal>
                  )}
               </div>
            </Container>
         </div>
      </>
   );
};

export default TaskList;
