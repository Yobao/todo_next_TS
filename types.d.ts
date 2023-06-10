export interface Lists {
   name: string;
   description: string;
   id: string;
}

export interface Tasks {
   id: string;
   listId: string;
   name: string;
   description: string;
   dueDate: Date;
   status: string;
}
