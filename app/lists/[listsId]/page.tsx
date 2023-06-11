"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiDelete, mdiMagnify, mdiPlus, mdiCheckboxMarked } from "@mdi/js";

import Portal from "@/HOC/portal";
import Container from "@/components/container";

import Table from "@/components/ui/table";
import LoadingButton from "@/components/ui/loading-button";
import { TASKS } from "@/utils/calls";
import { Task } from "@/types";
import { TASK } from "@/constants/constants";
import { convertDate } from "@/utils/utils";
import CreateTaskModal from "./create-task-modal";

interface pageProps {
   params: { listsId: string };
}

// @CONSTANTS
const tableHeader = [
   {
      key: "status",
      text: "Set as done",
      component: function (data: string) {
         return (
            <button
               onClick={(e) => this.action(data)}
               className='bg-red hover:scale-125 transition delay-100 duration-300 ease-in-out cursor-pointer'
            >
               <Icon path={mdiCheckboxMarked} size={1} className='mr-1' color={"green"} />
            </button>
         );
      },
   },
   { key: "name", text: "Task name" },
   {
      key: "dueDate",
      text: "Due date",
      component: function (data: string) {
         const convertedDate = convertDate(data);
         return <p>{convertedDate}</p>;
      },
   },
   {
      key: "detail",
      text: "Detail",
      component: function (data: string) {
         return (
            <button
               onClick={() => this.action(data)}
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
      component: function (data: string) {
         return (
            <button
               onClick={() => this.action(data)}
               className='hover:scale-125 transition delay-100 duration-300 ease-in-out cursor-pointer'
            >
               <Icon path={mdiDelete} size={1} className='mr-1' color={"#b22e01"} />
            </button>
         );
      },
   },
];

// @COMPONENT
const TaskList: FC<pageProps> = ({ params }) => {
   const [data, setData] = useState<Task[]>();
   const [createModal, setCreateModal] = useState(false);

   const handleDataLoad = useCallback(() => {
      TASKS.list(params.listsId).then((data) => setData(data));
   }, []);

   useEffect(() => {
      handleDataLoad();
   }, []);

   const handleShowCreateModal = useCallback(() => {
      setCreateModal(true);
   }, [createModal]);

   const handleCloseCreateModal = useCallback(() => {
      setCreateModal(false);
   }, [createModal]);

   const handleSetTaskAsDone = async (taskId) => {
      const updatedTask = await TASKS.update(params.listsId, taskId, { status: TASK.status.done });
   };

   const handleTaskDetail = (taskId) => {
      console.log("DETAIL", taskId);
   };

   const handleDeleteTask = async (taskId) => {
      const deletedTask = await TASKS.delete(params.listsId, taskId);
      if (deletedTask) handleDataLoad();
   };

   if (!data) return <LoadingButton />;

   const tableHeaderWithAction = getTableHeader(
      tableHeader,
      handleSetTaskAsDone,
      handleTaskDetail,
      handleDeleteTask
   );

   return (
      <>
         {createModal && (
            <Portal>
               <CreateTaskModal closeModal={handleCloseCreateModal} params={params} />
            </Portal>
         )}
         <div className='my-8 mx-8 z-1'>
            <Container>
               <div className='mx-auto'>
                  <div className='flex flex-row justify-start'>
                     <button
                        onClick={handleShowCreateModal}
                        className='btn btn-info btn-sm hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
                     >
                        <Icon path={mdiPlus} size={1} className='mr-1' />
                        Create task
                     </button>
                  </div>

                  <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700 mt-6 mb-10' />

                  <Table header={tableHeaderWithAction} data={data} />
               </div>
            </Container>
         </div>
      </>
   );
};

// @HELPERS
const getTableHeader = (tableHeader, handleSetTaskAsDone, handleTaskDetail, handleDeleteTask) => {
   const header = [...tableHeader];

   const TASK_ACITON_MAP = new Map();

   TASK_ACITON_MAP.set("status", handleSetTaskAsDone);
   TASK_ACITON_MAP.set("detail", handleTaskDetail);
   TASK_ACITON_MAP.set("delete", handleDeleteTask);

   header.forEach((cell) => {
      const cellAction = TASK_ACITON_MAP.get(cell.key);

      cellAction && (cell.action = cellAction);
   });

   return header;
};

export default TaskList;
