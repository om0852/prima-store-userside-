import Center from "@/component/Center";
import Header from "@/component/Header";
import { ProductGrid } from "@/component/NewProducts";
import ProductBox from "@/component/ProductBox";
import { connectToDB } from "@/libs/connect";
import Product from "@/models/Product";
import React from "react";
import styled from "styled-components";
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 2vh;
`;
const ProductPage = ({ allProduct }) => {
  // console.log(allProduct)
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductGrid>
          {allProduct &&
            allProduct.map((product, index) => (
              <ProductBox key={index} {...product} />
            ))}
        </ProductGrid>
      </Center>
    </>
  );
};

export async function getServerSideProps() {
  await connectToDB();
  const newProduct = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      allProduct: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}

export default ProductPage;
