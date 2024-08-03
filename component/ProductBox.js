import React from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import CartIcon from "./icons/CartIcon";
import PriceIcon from "./icons/PriceIcon";

const ProductWrapper = styled.div``;
const ProductInfoBox = styled.div`
  margin-top: 10px;
`;
const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 0%.9rem;
  margin: 0;
  text-transform: capitalize;
  /* text-align: center; */
`;
const ProductBox = ({
  title,
  description,
  images,
  properties,
  category,
  price,
  _id,
}) => {
  return (
    <ProductWrapper>
      <WhiteBox>
        <div>
          <img src={images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title> {title}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          <Buttons primary outline>
            Add to cart
          </Buttons>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
