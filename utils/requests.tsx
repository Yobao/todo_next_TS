const URL = process.env.NEXT_PUBLIC_URL;

const headers = {
   "Content-Type": "application/json",
};

const fetchData = async (slug: string, options: object) => {
   const response = await fetch(URL + slug, options);
   const data = await response.json();
   return data;
};

const requests = {
   GET: async (slug: string) => {
      const options = { method: "GET", headers };
      const data = await fetchData(slug, options);

      return data;
   },
   POST: async (slug: string, body: object) => {
      const options = { method: "POST", headers, body: JSON.stringify(body) };
      const data = await fetchData(slug, options);

      return data;
   },
   PUT: async (slug: string, body: object) => {
      const options = { method: "PUT", headers, body: JSON.stringify(body) };
      const data = await fetchData(slug, options);

      return data;
   },
   DELETE: async (slug: string) => {
      const options = { method: "DELETE", headers };
      const data = await fetchData(slug, options);

      return data;
   },
};

export default requests;
