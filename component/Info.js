import React from "react";
import styled from "styled-components";
const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  place-items: center;
  @media screen and (min-width: 786px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Img = styled.img`
  margin: 0 4px;
  height: 30px;
`;
const Line =styled.div`
width: 2px ;
height: 14vh;
background-color: red;
/* display: none; */
`
const Container = styled.div`
  display: flex;
  height: auto;
  margin: 2vh 0;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 786px) {
    /* display: grid; */
    /* display: none; */
    /* grid-template-columns: auto auto auto; */
  }
`;
const Info = () => {
  return (
    <div className="px-4">
      <Container
        className=" h-[100px]"
        style={{
          gridTemplateColumns: "auto auto auto auto",
          border: "2px solid red",
        }}
      >
        <CardDiv className="">
          <Img
            width="30"
            height="30"
            src="https://Img.icons8.com/emoji/48/rocket-emji.png"
            alt="rocket-emji"
          />
          <div>Fast Deilvery</div>
        </CardDiv>
        <div
          className="w-[1px] h-[10vh] bg-blue-500"
          style={{ height: "14vh", background: "red", width: "2px" }}
        ></div>
        <CardDiv className="">
          <Img
            width="30"
            height="30"
            src="https://Img.icons8.com/color/48/private2--v1.png"
            alt="private2--v1"
          />
          <div className="text-center">Secure Payment</div>
        </CardDiv>
        <Line
          className="w-[1px] h-[10vh] bg-blue-500"
          style={{ height: "14vh", background: "red", width: "2px" }}
        ></Line>

        <CardDiv className="">
          <Img
            width="30"
            height="30"
            src="https://Img.icons8.com/color/48/speech-bubble-with-dots.png"
            alt="speech-bubble-with-dots"
          />
          <div>24/7 Support</div>
        </CardDiv>
        <div
          className="w-[1px] h-[10vh] bg-blue-500"
          style={{ height: "14vh", background: "red", width: "2px" }}
        ></div>

        <CardDiv className="">
          <Img
            width="30"
            height="30"
            src="https://Img.icons8.com/color/48/gift--v1.png"
            alt="gift--v1"
          />
          <div>Gifts Service</div>
        </CardDiv>
      </Container>
    </div>
  );
};

export default Info;
