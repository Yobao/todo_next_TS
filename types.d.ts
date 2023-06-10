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
