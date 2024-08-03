import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap:20px;
  padding-top: 30px;
`;

const NewProducts = ({ products }) => {
  return (
    <Center>
      <ProductGrid>
        {products &&
          products.map((product, index) => <ProductBox {...product} />)}
      </ProductGrid>
    </Center>
  );
};

export default NewProducts;
