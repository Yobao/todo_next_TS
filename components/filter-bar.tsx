import { FC } from "react";

interface Filter {
   key: string;
   text: string;
   list: string[];
}

interface ActiveFilter {
   key: string;
   value: string;
}

interface pageProps {
   filterList: Filter[];
   handleFilters: Function;
   activeFilters: any;
}

const FilterBar: FC<pageProps> = ({ filterList, handleFilters, activeFilters }) => {
   return (
      <>
         {filterList.map((filter: Filter) => (
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
                  {filter.list.map((item: string) => (
                     <li key={item}>
                        <a
                           onClick={() => handleFilters({ key: filter.key, filter: item })}
                           className={` ${
                              activeFilters && activeFilters.get("status").filter === item
                                 ? "bg-blue-200"
                                 : ""
                           }`}
                        >
                           {item}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         ))}
      </>
   );
};

export default FilterBar;
