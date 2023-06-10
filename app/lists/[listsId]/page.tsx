"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FC } from "react";

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
         <p>TEST</p>
      </div>
   );
};

export default TaskList;
