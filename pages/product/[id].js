import React, { useContext } from "react";
import { Title } from "../products";
import { connectToDB } from "@/libs/connect";
import Product from "@/models/Product";
import styled from "styled-components";
import Header from "@/component/Header";
import Center from "@/component/Center";
import ProductImages from "@/component/ProductImages";
import { CartContext } from "@/component/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
    justify-content: start;

  }
`;

const WhiteBox = styled.div`
  background-color: white;
  height: fit-content;
  border-radius: 10px;
  padding: 30px;
`;
const Box = styled.div`
  background-color: none;
  border-radius: 10px;
  padding: 10px;
  height: auto;
`;
const PriceRow = styled.div`
display: flex;
gap: 20px;
font-weight: 500;
font-size: 1.2rem;
align-items:center;
`
const ProductPage = ({ product }) => {
  const {addProduct}=useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <Box>
            <Title>{product?.title}</Title>
            <p className="text-justify">{product.description}</p>
            <div className="flex justify-between w-1/2 items-center">
            <PriceRow>₹{product.price}</PriceRow>
            <button onClick={()=>addProduct(product._id)} className="border-2 bg-green-800 border-green-800 rounded-md text-white my-4 py-1 px-6 ">Add to cart</button>
            </div>
          </Box>
        </ColWrapper>
      </Center>
    </>
  );
};

export default ProductPage;

export async function getServerSideProps({ query }) {
  await connectToDB();
  console.log(query);
  const product = await Product.findOne({ _id: query.id });
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
