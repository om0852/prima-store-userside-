import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/component/Header";
import Featured from "@/component/Featured";
import { signIn, signOut, useSession } from "next-auth/react";
import Product from "@/models/Product";
import { connectToDB } from "@/libs/connect";
import NewProducts from "@/component/NewProducts";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ featuredProduct, newProduct }) {
  // console.log(featuredProduct)

  return (
    <>
      <Header />
      {featuredProduct && <Featured product={featuredProduct} />}{" "}
      {newProduct && <NewProducts products={newProduct} />}{" "}
    </>
  );
}

export async function getServerSideProps() {
  const faeturedproductId = "66adb1718f4fcefa38c05ac6";
  await connectToDB();
  const featuredProduct = await Product.findById(faeturedproductId);
  const newProduct = await Product.find(
    {},
    null,
    { sort: { _id: -1 } },
    { limit: 10 }
  );
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
