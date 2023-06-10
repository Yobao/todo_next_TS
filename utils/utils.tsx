export const convertDate = (msDate: string) => {
   const tempDate = new Date(Number(msDate + "000"));
   let day = tempDate.getDate().toString();
   let month = (tempDate.getMonth() + 1).toString();
   const year = tempDate.getFullYear();

   day.length - 1 || (day = "0" + day);
   month.length - 1 || (month = "0" + month);

   const dateString = `${day}.${month}.${year}`;

   return dateString;
};
