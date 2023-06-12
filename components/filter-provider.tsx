import { useEffect, useState } from "react";

import { Task } from "@/types";

const FilterProvider = ({ children, data, activeFilters }) => {
   const [filteredData, setFilteredData] = useState(data);

   useEffect(() => {
      if (activeFilters) {
         const filtersObject = Object.fromEntries(activeFilters);

         let tempFilter = data.filter((task) => {
            return Object.entries(filtersObject).every((key) => {
               return task[key[0]] === activeFilters.get(key[0]).filter;
            });
         });

         setFilteredData(tempFilter);
      } else {
         setFilteredData(data);
      }
   }, [activeFilters, data]);

   return <>{children(filteredData.sort((a: Task, b: Task) => (a.status > b.status ? 1 : -1)))}</>;
};

export default FilterProvider;
