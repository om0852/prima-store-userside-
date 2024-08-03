import React from "react";
import Center from "./Center";
import styled from "styled-components";
import Buttons from "./Buttons";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  line-height: 8vh;
  margin-bottom: 1vh;
  font-size: 3rem;
  font-weight: normal;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1.1fr 0.9fr;
  img {
    max-width: 100%;
    background-color: none;
  }
  div {
    /* align-items: center;
    display: flex;
    flex-direction: column; */
  }
`;

const Column = styled.div`
  /* display: flex;
 align-items: center; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: auto;
  gap: 5px;
  margin-top: 3vh;
`;

const Featured = ({product}) => {
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
              <ButtonLink href={"/products/"+product._id} outline={true} white={true} >
                Read More
              </ButtonLink>
              <Buttons white={true} >
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
