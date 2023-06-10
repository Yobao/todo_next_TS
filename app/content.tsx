import { FC } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container";
import Card from "@/components/card";

import { List } from "@/types";

const images = ["/work.jpg", "/freeTime.jpg", "/others.jpg"];

interface pageProps {
   data: List[];
}

const Content: FC<pageProps> = ({ data }) => {
   const router = useRouter();

   const handleCardClick = (list) => {
      router.push(`/lists/${list.id}`);
   };

   return (
      <Container>
         <>
            {data.map((list, index) => (
               <Card key={list.name} title={list.name} onClick={() => handleCardClick(list)}>
                  <div className=''>
                     <figure>
                        <img src={images.at(index)} alt='car!' />
                     </figure>
                     <p className='my-4'>{list.description}</p>
                  </div>
               </Card>
            ))}
         </>
      </Container>
   );
};

export default Content;
