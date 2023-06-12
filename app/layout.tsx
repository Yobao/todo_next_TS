import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Todo App",
   description: "AMCEF Todo App Created by @Yoba",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <div>
               {children}
               <div id='modal-root' className='' />
            </div>
         </body>
      </html>
   );
}
