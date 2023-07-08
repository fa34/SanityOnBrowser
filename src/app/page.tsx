import { Image } from "sanity";
import Product from "../../sanity/Product";
import {client} from "../../sanity/lib/client"
import urlFor from "../../sanity/lib/image"

export const getProductData= async() => {
  const res =await client.fetch(`*[_type=='Product']{
    title,
    description,
  }`);
  return res
}

interface Iproduct{
  title:string,
  description:string,
  image:Image
  
  }

export default async function Home(){
const data: Iproduct[] = await getProductData();

return(
<div>
{data.map((item) => (
  <div>
  <h1>{item.title}</h1>
  <img src={urlFor(item.image).width(200).url()} />
  </div>
))}
</div>
)
}