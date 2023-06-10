import { useRouter } from "next/navigation";
import Container from "@/components/container";
import Card from "@/components/card";

const images = ["/work.jpg", "/freeTime.jpg", "/others.jpg"];

export default function Content({ data }) {
   const router = useRouter();

   const handleCardClick = () => {
      router.push("test");
   };

   return (
      <Container>
         <>
            {data.map((list, index) => (
               <Card key={list.name} title={list.name} onClick={handleCardClick}>
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
}
