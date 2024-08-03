import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap:20px;
  padding-top: 10px;
`;
const Title =styled.h2`
font-size: 2rem;
margin: 30px 0 0px;
font-family: 500;
`
const NewProducts = ({ products }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {products &&
          products.map((product, index) => <ProductBox {...product} />)}
      </ProductGrid>
    </Center>
  );
};

export default NewProducts;
