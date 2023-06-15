import { FC, useState, useMemo, createContext } from "react";

type Props = {
   children: CallableFunction;
   data: any[];
};

export interface Filter {
   key: string;
   text: string;
   list: string[];
   filter: string;
}

interface FilterContext {
   handleFilter: Function;
   filters: Map<string, Filter>;
}

export const FilterContext = createContext<FilterContext | null>(null);

const FilterProvider: FC<Props> = ({ children, data }) => {
   const [filterMap, setFilterMap] = useState(new Map());

   const handleFilter = (filter: Filter) => {
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

            newData = data.filter((item) => {
               const rawName = item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
               return rawName.match(re);
            });

            filterMap.delete("search");
         }

         if (filterMap.size) {
            newData = data.filter((item) => {
               return Object.entries(filtersObject).every((key) => {
                  return item[key[0]] === filterMap.get(key[0]).filter;
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
