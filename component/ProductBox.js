import React, { useContext } from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import CartIcon from "./icons/CartIcon";
import PriceIcon from "./icons/PriceIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;
const ProductInfoBox = styled.div`
  margin-top: 10px;
`;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 10px;
  height: 150px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;
const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  margin-top: 2px;
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const Title = styled(Link)`
  font-weight: 500;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 0%.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
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
  const url = "/product/" + _id;
  const { setCartProducts, addProduct } = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}> {title}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          <button
            onClick={() => addProduct(_id)}
            className="bg-green-800 rounded-md mx-2 text-white border-2 border-purple-700 py-1 px-2 mx-2 w-[auto] md:w-1/2"
          >
            Add to cart
          </button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
