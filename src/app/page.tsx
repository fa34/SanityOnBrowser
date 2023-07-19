import { Image } from "sanity";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import Link from "next/link";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=='Product']{
    title,
    description,
    image,
    slug, // Add the slug field to navigate to individual product pages
  }`);
  return res;
};

interface IProduct {
  title: string;
  description: string;
  image: Image;
  slug: string;
}

export default async function Home() {
  const data: IProduct[] = await getProductData();
  return (
    <div>
      {data.map((item: IProduct) => (
        <div key={item.slug}>
          <Link href={`/products/${item.slug}`}>
            <a>
              <h1>{item.title}</h1>
              <img
                width={200}
                height={300}
                src={urlForImage(item.image).url()}
                alt="image"
              />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const data = await getProductData();
  return { props: { data } };
}
