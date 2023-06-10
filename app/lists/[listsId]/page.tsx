"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Table from "@/components/ui/table";
import { TASKS } from "@/utils/calls";
import { Tasks } from "@/types";

interface pageProps {
   params: { listsId: string };
}

const TaskList: FC<pageProps> = ({ params }) => {
   const router = useRouter();
   const pathName = usePathname();
   const [data, setData] = useState<Tasks[]>();

   useEffect(() => {
      TASKS.list(params.listsId).then((data) => console.log(data));
   }, []);

   return (
      <div>
         <Table />
      </div>
   );
};

export default TaskList;
