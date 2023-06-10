"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Container from "@/components/container";
import Table from "@/components/ui/table";
import { TASKS } from "@/utils/calls";
import { Task } from "@/types";

interface pageProps {
   params: { listsId: string };
}
"Select", "Task name", "Due date";
const tableHeader = [{}, {}, {}, {}];

const TaskList: FC<pageProps> = ({ params }) => {
   const router = useRouter();
   const pathName = usePathname();
   const [data, setData] = useState<Task[]>();

   useEffect(() => {
      TASKS.list(params.listsId).then((data) => setData(data));
   }, []);

   return (
      <Container>
         <Table />
      </Container>
   );
};

export default TaskList;
