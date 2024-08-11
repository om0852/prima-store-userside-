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
  font-size: 1.6rem;
  align-items: center;
`;
const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <Box>
            <Title style={{fontSize:"1.9rem"}}>{product?.title}</Title>
            <ul>
              {Object.entries(product.properties).map(([key, value]) => (
                <li key={key}>
                  <span className="text-xl font-semibold">{key}</span>: {value}
                </li>
              ))}
            </ul>
            <p className="text-justify my-4">{product.description}</p>
            <div className=" justify-between w-1/2 items-center">
              <PriceRow>₹{product.price}</PriceRow>
              <button
            onClick={() => addProduct(_id)}
            style={{
              background: "linear-gradient(to bottom right, #6B46C1, #4299E1)",
              color: "#fff",
              fontWeight: "500",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              width: "100%",
              padding: "0.625rem 1.25rem",
              textAlign: "center",
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              transition: "background 0.3s ease-in-out",
              outline: "none",
              boxShadow: "0 0 10px rgba(66, 153, 225, 0.5)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to bottom left, #6B46C1, #4299E1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to bottom right, #6B46C1, #4299E1)")
            }
          >
            Add to cart
          </button>
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
