import requests from "./requests";

export const LISTS = {
   list: async () => await requests.GET("/lists"),
   get: async (listId: string) => await requests.GET(`/lists/${listId}`),
};

export const TASKS = {
   list: async (listId: string) => await requests.GET(`/lists/${listId}/tasks`),
   create: async (slug: string) => await requests.POST(slug),
   get: async (slug: string) => await requests.GET(slug),
   delete: async (slug: string) => await requests.DELETE(slug),
};
