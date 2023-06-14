"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
   mdiDelete,
   mdiMagnify,
   mdiPlus,
   mdiCheckboxMarked,
   mdiCheckboxBlankOutline,
} from "@mdi/js";

import Container from "@/components/container";
import Table from "@/components/ui/table";
import LoadingButton from "@/components/ui/loading-button";
import CreateTaskModal from "./create-task-modal";
import DeleteTaskModal from "./delete-task-modal";
import FilterProvider from "@/components/filter-provider";
import FilterBar from "@/components/filter-bar";
import SearchBar from "@/components/search-bar";

import { TASKS, LISTS } from "@/utils/calls";
import { Task, TaskTableHeader, TaskActions, List } from "@/types";
import { TASK } from "@/constants/constants";
import { convertDate } from "@/utils/utils";
import DetailModal from "./detail-modal";

interface pageProps {
   params: { listsId: string };
}

// @CONSTANTS
const tableHeader = [
   {
      key: "status",
      text: "Set as done",
      component: function (data: TaskActions) {
         /*          console.log(data); */
         return (
            <button
               onClick={() => this.action(data.id)}
               className='hover:scale-125 transition delay-100 duration-300 ease-in-out cursor-pointer'
            >
               <Icon
                  path={
                     data.value === TASK.status.active ? mdiCheckboxBlankOutline : mdiCheckboxMarked
                  }
                  size={1}
                  className='mr-1'
                  color={data.value === TASK.status.active ? "" : "green"}
               />
            </button>
         );
      },
   },
   { key: "name", text: "Task name" },
   {
      key: "dueDate",
      text: "Due date",
      component: function (data: TaskActions) {
         const convertedDate = convertDate(data.value);
         return <p>{convertedDate}</p>;
      },
   },
   {
      key: "detail",
      text: "Detail",
      component: function (data: TaskActions) {
         return (
            <button
               onClick={() => this.action(data.id)}
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
      component: function (data: TaskActions) {
         return (
            <button
               onClick={() => this.action(data.id)}
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
   const [listData, setListData] = useState<List>();
   const [createModal, setCreateModal] = useState(false);
   const [deleteModal, setDeleteModal] = useState(false);
   const [detailModal, setDetailModal] = useState(false);
   const [selectedTaskId, setSelectedTaskId] = useState<string>("");

   const handleTaskListLoad = useCallback(async () => {
      const tasks = await TASKS.list(params.listsId);
      if (tasks) setData(tasks);
   }, []);

   const handleListInfoLoad = useCallback(async () => {
      const listInfo = await LISTS.get(params.listsId);
      if (listInfo) setListData(listInfo);
   }, []);

   useEffect(() => {
      handleListInfoLoad();
      handleTaskListLoad();
   }, []);

   const handleSubmit = async (data: object) => {
      const taskCreated = await TASKS.create(params.listsId, {
         ...data,
         status: TASK.status.active,
      });
      if (taskCreated) {
         handleShowCreateModal();
         handleTaskListLoad();
      }
   };

   const handleShowCreateModal = useCallback(() => {
      setCreateModal(!createModal);
   }, [createModal]);

   const handleShowDeleteModal = (taskId?: string) => {
      setSelectedTaskId(taskId!);
      setDeleteModal(!deleteModal);
   };

   const handleShowDetailModal = () => {
      setDetailModal(!detailModal);
   };

   const handleUpdateTask = async (taskId?: string) => {
      const updatedTask = await TASKS.update(params.listsId, taskId!, { status: TASK.status.done });
      if (updatedTask) handleTaskListLoad();
   };

   const handleTaskDetail = (taskId?: string) => {
      setSelectedTaskId(taskId!);
      handleShowDetailModal();
   };

   const handleDeleteTask = async () => {
      const deletedTask = await TASKS.delete(params.listsId, selectedTaskId);
      if (deletedTask) {
         handleTaskListLoad();
         handleShowDeleteModal();
      }
   };

   // @RENDER
   if (!data)
      return (
         <Container>
            <LoadingButton />
         </Container>
      );

   const tableHeaderWithAction = getTableHeader(
      tableHeader,
      handleUpdateTask,
      handleTaskDetail,
      handleShowDeleteModal
   );

   return (
      <>
         {createModal && (
            <CreateTaskModal closeModal={handleShowCreateModal} handleSubmit={handleSubmit} />
         )}
         {deleteModal && (
            <DeleteTaskModal closeModal={handleShowDeleteModal} action={handleDeleteTask} />
         )}

         {detailModal && (
            <DetailModal
               closeModal={handleShowDetailModal}
               data={data.find((task) => task.id === selectedTaskId)}
            />
         )}

         <div className='my-8 mx-8 z-1'>
            <Container>
               <div>
                  <div className='flex flex-row justify-end'>
                     <div className=''>
                        <button
                           onClick={handleShowCreateModal}
                           className='btn btn-md text-xs btn-success hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
                        >
                           <Icon path={mdiPlus} size={1} className='mr-1' />
                           Create task
                        </button>
                     </div>
                  </div>

                  <FilterProvider data={data}>
                     {(filteredData: Task[]) => (
                        <>
                           <FilterBar filterList={getFilters(data)} header={listData!.name} />
                           <SearchBar />

                           <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700 mt-6 mb-10' />

                           <Table header={tableHeaderWithAction} data={filteredData} />
                        </>
                     )}
                  </FilterProvider>
               </div>
            </Container>
         </div>
      </>
   );
};

// @HELPERS
const getTableHeader = (
   tableHeader: TaskTableHeader[],
   handleSetTaskAsDone: Function,
   handleTaskDetail: Function,
   handleDeleteTask: Function
) => {
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

const getFilters = (data: Task[]) => {
   const filterList = [];

   const nameFilterList = [...new Set(data.map((value: Task) => value.name))].sort();
   const statusFilterList = [...new Set(data.map((value: Task) => value.status))].sort();

   filterList.push(
      { key: "status", text: "Status", list: statusFilterList },
      { key: "name", text: "Name", list: nameFilterList }
   );

   return filterList;
};

export default TaskList;
