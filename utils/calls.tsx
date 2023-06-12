import requests from "./requests";

export const LISTS = {
   list: async () => await requests.GET("/lists"),
   get: async (listId: string) => await requests.GET(`/lists/${listId}`),
};

export const TASKS = {
   list: async (listId: string) => await requests.GET(`/lists/${listId}/tasks`),

   create: async (listId: string, body: object) =>
      await requests.POST(`/lists/${listId}/tasks`, body),

   update: async (listId: string, taskId: string, body: object) =>
      await requests.PUT(`/lists/${listId}/tasks/${taskId}`, body),

   get: async (slug: string) => await requests.GET(slug),

   delete: async (listId: string, taskId: string) =>
      await requests.DELETE(`/lists/${listId}/tasks/${taskId}`),
};
