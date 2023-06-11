"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
   mdiDelete,
   mdiMagnify,
   mdiPlus,
   mdiCheckboxMarked,
   mdiCheckboxBlankOutline,
   mdiFilter,
   mdiFilterRemove,
} from "@mdi/js";

import Container from "@/components/container";
import Table from "@/components/ui/table";
import LoadingButton from "@/components/ui/loading-button";
import CreateTaskModal from "./create-task-modal";
import DeleteTaskModal from "./delete-task-modal";
import FilterProvider from "@/components/filter-provider";
import FilterBar from "@/components/filter-bar";

import { TASKS } from "@/utils/calls";
import { Task } from "@/types";
import { TASK } from "@/constants/constants";
import { convertDate } from "@/utils/utils";

interface pageProps {
   params: { listsId: string };
}

interface TaskActions {
   id: string;
   value: string;
}

// @CONSTANTS
const tableHeader = [
   {
      key: "status",
      text: "Set as done",
      component: function (data: TaskActions) {
         return (
            <button
               onClick={(e) => this.action(data.id)}
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
      component: function (data: string) {
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
   const [createModal, setCreateModal] = useState(false);
   const [deleteModal, setDeleteModal] = useState(false);
   const [detailModal, setDetailModal] = useState(false);
   const [showFilterBar, setShowFilterBar] = useState(false);
   const [selectedTaskId, setSelectedTaskId] = useState();
   const [activeFilters, setActiveFilters] = useState();

   const handleDataLoad = useCallback(async () => {
      const tasks = await TASKS.list(params.listsId);
      if (tasks) setData(tasks);
   }, []);

   const handleSubmit = async (data: object) => {
      const taskCreated = await TASKS.create(params.listsId, {
         ...data,
         status: TASK.status.active,
      });
      if (taskCreated) {
         handleShowCreateModal();
         handleDataLoad();
      }
   };

   useEffect(() => {
      handleDataLoad();
   }, []);

   const handleShowCreateModal = useCallback(() => {
      setCreateModal(!createModal);
   }, [createModal]);

   const handleShowDeleteModal = (taskId?: string) => {
      setSelectedTaskId(taskId);
      setDeleteModal(!deleteModal);
   };

   const handleShowDetailModal = () => {
      setDetailModal(!detailModal);
   };

   const handleShowFilterBar = () => {
      setShowFilterBar(!showFilterBar);
   };

   const handleSetTaskAsDone = async (taskId?: string) => {
      const updatedTask = await TASKS.update(params.listsId, taskId, { status: TASK.status.done });
      if (updatedTask) handleDataLoad();
   };

   const handleTaskDetail = (taskId?: string) => {
      console.log("DETAIL", taskId);
   };

   const handleDeleteTask = async () => {
      const deletedTask = await TASKS.delete(params.listsId, selectedTaskId);
      if (deletedTask) {
         handleDataLoad();
         handleShowDeleteModal();
      }
   };

   const handleActiveFilters = (filters) => {
      setActiveFilters((prevState) => {
         const newState = new Map(prevState);
         newState.set(filters.key, filters);
         return newState;
      });
   };

   const handleClearFilters = () => {
      handleDataLoad();
      setActiveFilters(undefined);
   };

   // @RENDER
   if (!data) return <LoadingButton />;

   const tableHeaderWithAction = getTableHeader(
      tableHeader,
      handleSetTaskAsDone,
      handleTaskDetail,
      handleShowDeleteModal
   );

   return (
      <>
         {createModal && (
            <CreateTaskModal closeModal={handleShowCreateModal} handleSubmit={handleSubmit} />
         )}
         {deleteModal && (
            <DeleteTaskModal
               closeModal={handleShowDeleteModal}
               params={params}
               action={handleDeleteTask}
            />
         )}

         <div className='my-8 mx-8 z-1'>
            <Container>
               <FilterProvider data={data} activeFilters={activeFilters}>
                  {(filteredData) => (
                     <div>
                        <div className='flex flex-row justify-between'>
                           <div className=''>
                              <button
                                 onClick={handleShowCreateModal}
                                 className='btn btn-success hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
                              >
                                 <Icon path={mdiPlus} size={1} className='mr-1' />
                                 Create task
                              </button>
                           </div>

                           <div className='flex flex-row'>
                              {activeFilters && (
                                 <div>
                                    <button
                                       onClick={handleClearFilters}
                                       className='btn btn-sm hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer cursor-pointer'
                                    >
                                       <Icon path={mdiFilterRemove} size={1} className='mr-1' />
                                    </button>
                                 </div>
                              )}

                              <div className='ml-3'>
                                 <button
                                    onClick={handleShowFilterBar}
                                    className='btn btn-sm hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer cursor-pointer'
                                 >
                                    <Icon path={mdiFilter} size={1} className='mr-1' />
                                 </button>
                              </div>
                           </div>
                        </div>

                        {showFilterBar && (
                           <FilterBar
                              filterList={getFilters(data)}
                              handleFilters={handleActiveFilters}
                              activeFilters={activeFilters}
                           ></FilterBar>
                        )}

                        <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700 mt-6 mb-10' />

                        <Table header={tableHeaderWithAction} data={filteredData} />
                     </div>
                  )}
               </FilterProvider>
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

const getFilters = (data: Task[]) => {
   const filterList = [];

   const statusFilterList = [...new Set(data.map((value: Task) => value.status))].sort();

   filterList.push({ key: "status", text: "Status", list: statusFilterList });

   return filterList;
};

export default TaskList;
