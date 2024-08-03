import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/component/Header";
import Featured from "@/component/Featured";
import Product from "@/models/Product";
import { connectToDB } from "@/libs/connect";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ product }) {
  return (
    <>
      <Header />
      {product && <Featured product={product} />}{" "}
    </>
  );
}

export async function getServerSideProps() {
  const faeturedproductId = "66ab99ee53a38e5b939856d0";
  await connectToDB();
  const product = await Product.findById(faeturedproductId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
