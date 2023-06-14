export interface List {
   name: string;
   description: string;
   id: string;
}

export interface Task {
   id: string;
   listId: string;
   name: string;
   description: string;
   dueDate: Date;
   status: string;
}

export interface CreateTaskForm {
   taskName: string;
   dueDate: Date;
   description: string;
}

export interface TaskTableHeader {
   key: string;
   text: string;
   component?: Function;
   action?: Function;
}

export interface TaskActions {
   id: string;
   value: string;
}
