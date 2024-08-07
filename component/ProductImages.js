import React, { useState } from "react";
import styled from "styled-components";
const BigImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;

  margin-top: 10px;
  @media screen and (min-width: 768px) {
    justify-content: start;
  }
`;
const ImageContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  padding: 2px;
  ${props=>props.active?"border-color:red;":"border-color:none;"}
  cursor: pointer;
  height: 60px;
  /* background-color: #ccc; */
  border-radius: 5px;
`;
const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <>
      <ImageContainer>
        <BigImg src={images?.[activeImage]} />
      </ImageContainer>
      <ImageButtons>
        {images.map((data, index) => (
          <ImageButton key={index} onClick={() => setActiveImage(index)} active={index==activeImage}>
            <BigImg src={data} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
