import { FC, useState, useMemo, createContext } from "react";

export const FilterContext = createContext(null);

const FilterProvider: FC<any> = ({ children, data }) => {
   const [filterMap, setFilterMap] = useState(new Map());

   const handleFilter = (filter: any) => {
      if (!filter) {
         setFilterMap(new Map());
      } else {
         setFilterMap((prevState) => {
            const newState = new Map(prevState);
            newState.set(filter.key, filter);
            return newState;
         });
      }
   };

   const filteredData = useMemo(() => {
      let newData;
      if (filterMap) {
         const filtersObject = Object.fromEntries(filterMap);

         if (filterMap.get("search")) {
            const rawValue = filterMap
               .get("search")
               .filter.normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "");
            const re = new RegExp(rawValue, "gi");

            newData = data.filter((item: any) => {
               const rawName = item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
               return rawName.match(re);
            });

            filterMap.delete("search");
         }

         if (filterMap.size) {
            newData = data.filter((task: any) => {
               return Object.entries(filtersObject).every((key) => {
                  return task[key[0]] === filterMap.get(key[0]).filter;
               });
            });
         }
      }

      return newData ?? data;
   }, [filterMap, data]);

   return (
      <FilterContext.Provider value={{ handleFilter, filters: filterMap }}>
         {children(filteredData)}
      </FilterContext.Provider>
   );
};

export default FilterProvider;
