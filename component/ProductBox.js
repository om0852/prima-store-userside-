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

const Title = styled(Link)`
  font-weight: 500;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
  const url = "/product/"+_id;
  const {setCartProducts}=useContext(CartContext);
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
          <Buttons onClick={()=>setCartProducts(prev=>[...prev,_id])} primary outline>
            Add to cart
          </Buttons>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
