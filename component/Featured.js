import React from "react";
import Center from "./Center";
import styled from "styled-components";
import Buttons from "./Buttons";
import ButtonLink from "./ButtonLink";
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
              <Buttons primary={true} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
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
