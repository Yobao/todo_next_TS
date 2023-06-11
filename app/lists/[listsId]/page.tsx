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
import DetailModal from "./detail-modal";

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

   useEffect(() => {
      handleDataLoad();
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

   const handleUpdateTask = async (taskId?: string) => {
      const updatedTask = await TASKS.update(params.listsId, taskId, { status: TASK.status.done });
      if (updatedTask) handleDataLoad();
   };

   const handleTaskDetail = (taskId?: string) => {
      setSelectedTaskId(taskId);
      handleShowDetailModal();
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
            <DeleteTaskModal
               closeModal={handleShowDeleteModal}
               params={params}
               action={handleDeleteTask}
            />
         )}

         {detailModal && (
            <DetailModal
               closeModal={handleShowDetailModal}
               data={data.find((task) => task.id === selectedTaskId)}
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
                                 className='btn btn-sm text-xs btn-success hover:scale-110 transition delay-100 duration-300 ease-in-out cursor-pointer'
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

                        <div className='mt-6'>
                           <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                              Search
                           </label>
                           <div className='relative'>
                              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                 <svg
                                    aria-hidden='true'
                                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    ></path>
                                 </svg>
                              </div>
                              <input
                                 type='search'
                                 id='default-search'
                                 className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                 placeholder='Search Mockups, Logos...'
                                 required
                              />
                              <button
                                 type='submit'
                                 className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                              >
                                 Search
                              </button>
                           </div>
                        </div>

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
