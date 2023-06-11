import { useEffect, useState } from "react";

import { Task } from "@/types";

const FilterProvider = ({ children, data, activeFilters }) => {
   const [filteredData, setFilteredData] = useState(data);

   useEffect(() => {
      if (activeFilters) {
         let tempFilter = data.filter((task) => {
            return task.status === activeFilters.get("status").filter;
         });
         setFilteredData(tempFilter);
      } else {
         setFilteredData(data);
      }
   }, [activeFilters, data]);

   return <>{children(filteredData.sort((a: Task, b: Task) => (a.status > b.status ? 1 : -1)))}</>;
};

export default FilterProvider;
