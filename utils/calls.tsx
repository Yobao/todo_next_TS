import requests from "./requests";

export const LISTS = {
   list: async () => await requests.GET("/lists"),
   get: async (slug) => await requests.GET(slug),
};
