import { FC, useState, useEffect } from "react";

interface pageProps {
   text: string;
}

const Toast: FC<pageProps> = ({ text }) => {
   const [showToast, setShowToast] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <>
         {showToast && (
            <div className='toast toast-center toast-middle z-50 w-96 justify-center items-center'>
               <div className='alert alert-info'>
                  <span>{text}</span>
               </div>
            </div>
         )}
      </>
   );
};

export default Toast;
