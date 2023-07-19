import { useState } from "react";
import { useRouter } from "next/router";
import { Image } from "sanity";
import { client } from "../../../sanity/lib/client";   
import { urlForImage } from "../../../sanity/lib/image";    

export const getProductData = async (slug : any) => {
  const res = await client.fetch(`*[_type=='Product' && slug.current == $slug]{
    title,
    description,
    image,
    id,
  }`, { slug });
  return res[0]; // We expect only one result
};

interface IProduct {
  title: string;
  description: string;
  image: Image;
  id:string;
}



export default function ProductPage({ product }: { product: IProduct }) {
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    const product_id = product.id; // Replace this with the actual product ID.
    const quantity = 1; // You can set the desired quantity here.

    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id, quantity }),
      });

      if (response.status === 200) {
        setAddedToCart(true);
      } else {
        // Handle any error when adding the product to the cart
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Optionally, you can show an error message or toast here.
    }
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
        <Image
        width={300}
        height={200}
        src={urlForImage(product.image).url()}
        alt={product.title}
      /> 
 
      {!addedToCart && <button onClick={handleAddToCart}>Add to Cart</button>}
    </div>
  );
}

export async function getServerSideProps(context : any) {
  const { slug } = context.params;
  const product = await getProductData(slug);
  return {
    props: {
      product,
    },
  };
}
