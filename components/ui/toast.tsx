import { FC } from "react";

type ToastEnum = "info" | "success" | "warning" | "error";

interface pageProps {
   text: string;
   type: ToastEnum;
}

const Toast: FC<pageProps> = ({ text, type }) => {
   return (
      <div className='toast toast-center toast-middle'>
         <div className={`alert alert-${type}`}>
            <span>{text}</span>
         </div>
      </div>
   );
};

export default Toast;
