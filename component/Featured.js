import React from "react";
import Center from "./Center";
import styled from "styled-components";
const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: normal;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: .8fr 1.2fr;
  img{
    max-width: 100%;
    background-color: none;
  }
  div{
    /* align-items: center;
    display: flex;
    flex-direction: column; */
  }

`;

const Column=styled.div`
/* display: flex;
flex-direction: column; */
`

const Featured = () => {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            {" "}
            <Title>Pro anywhere</Title>
            <Desc>
              This page is an overview of the React documentation and related
              resources. React is a JavaScript library for building user
              interfaces. Learn what React is ... ‎Thinking in React ·
              ‎Tutorial: Intro to React · ‎Add React to a Website · ‎Hello World
            </Desc>
          </Column>
          <Column>
            <img src="/macbookimage.jfif" alt="" />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
