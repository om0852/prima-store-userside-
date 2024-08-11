import React, { useContext } from "react";
import Center from "./Center";
import styled from "styled-components";
import Buttons from "./Buttons";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  text-transform: capitalize;
  line-height: 8vh;
  color: red;
  margin-bottom: 1vh;
  font-size: 3rem;
  @media screen and (min-width: 786px) {
    font-size: 4rem;
    margin-bottom: 3vh;


  }
  font-weight: normal;
`;
const Desc = styled.p`
  color: #aaa;
  text-align: justify;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;

  img {
    max-width: 100%;
    background-color: none;
  }
  div {
    /* align-items: center;
    display: flex;
    flex-direction: column; */
  }
  img{
    max-width: 100%;
    max-height: 200px;
  }
  div:nth-child(1){
    order: 2;
  }
  @media screen and (min-width: 786px) {
    grid-template-columns: 1.1fr 0.9fr;

    div:nth-child(1){
    order: 0;
  }
  }
`;

const Column = styled.div`
  display: grid;
 place-items: center;
 @media screen and (min-width: 786px) {
  display: block;

  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: auto;
  gap: 5px;
  margin-top: 3vh;
`;
const Featured = ({product}) => {
  const {setCartProducts,addProduct}=useContext(CartContext)
   function addFeaturedToCart(product){
    addProduct(product)    
  }
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            {" "}
            <Title>{product.title}</Title>
            <Desc>
             {product.description}
            </Desc>
            <ButtonWrapper>
              <ButtonLink href={"/product/"+product._id} outline white >
                Read More
              </ButtonLink>
              <Buttons white onClick={()=>addFeaturedToCart(product._id)} >
                <CartIcon/>
                Add to cart
              </Buttons>
            </ButtonWrapper>
          </Column>
          <Column>
            <img src={product.images[0]} alt="" />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
