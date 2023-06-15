import { FC, useState, useMemo, useContext } from "react";
import { FilterContext } from "./filter-provider";
import Icon from "@mdi/react";
import { mdiFilter, mdiFilterRemove } from "@mdi/js";

interface Filter {
   key: string;
   text: string;
   list: string[];
}

interface pageProps {
   filterList: Filter[];
   header: string;
}

const FilterBar: FC<pageProps> = ({ filterList, header }) => {
   const filterContext = useContext(FilterContext);
   const [showFilters, setShowFilters] = useState(false);

   const filterArray: string[] = useMemo(() => {
      return Array.from(filterContext!.filters.values()).map((item) => item.filter);
   }, [filterContext]);

   const handleClearFilters = () => {
      filterContext!.handleFilter(null);
   };

   const handleShowFilterBar = () => {
      setShowFilters(!showFilters);
   };

   return (
      <div>
         <div className='flex flex-row justify-between mt-8'>
            <div className='flex flex-row justify-start items-center'>
               <h2 className='mb-2 mt-0 text-2xl font-bold leading-tight'>{header}</h2>
            </div>

            <div className='flex flex-row justify-end'>
               {filterContext!.filters.size > 0 && (
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

         <>
            {showFilters &&
               filterList.map((filter: Filter) => (
                  <div className='dropdown z-10 mt-6 mr-6' key={`filterBar-${filter.key}`}>
                     <button
                        id='dropdownHoverButton'
                        data-dropdown-toggle='dropdownHover'
                        data-dropdown-trigger='hover'
                        className='text-white bg-gray-500 hover:bg-gray-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
                        type='button'
                     >
                        {filter.text}
                        <svg
                           className='w-4 h-4 ml-2'
                           aria-hidden='true'
                           fill='none'
                           stroke='currentColor'
                           viewBox='0 0 24 24'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 9l-7 7-7-7'
                           ></path>
                        </svg>
                     </button>

                     <ul
                        tabIndex={0}
                        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
                     >
                        {filter.list.map((item) => (
                           <li key={item}>
                              <a
                                 onClick={() =>
                                    filterContext!.handleFilter({ key: filter.key, filter: item })
                                 }
                                 className={filterArray.includes(item) ? "bg-blue-200" : ""}
                              >
                                 {item}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
         </>
      </div>
   );
};

export default FilterBar;
