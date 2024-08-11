import React, { useContext } from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import CartIcon from "./icons/CartIcon";
import PriceIcon from "./icons/PriceIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  background-color: white;
  position: relative;
`;
const ProductInfoBox = styled.div`
  padding: 0 10px;
  background-color: white;
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
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
  }
  /* margin-top: 2px; */
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
        <Title style={{ fontWeight: "600", fontSize: "1.2rem",color:"purple" }} href={url}>
          {" "}
          {title}
        </Title>
        {/* <h1>
          {properties &&
            Object.entries(properties).map(([key, value]) => (
              <h1 className="text-md font-semibold capitalize">
                {key + " " + value}
              </h1>
            ))}
        </h1> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",

            gap: "10px",
            width: "100%",
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <img
              key={index} // It's important to provide a unique key for each element
              width="20"
              height="20"
              src="https://img.icons8.com/emoji/48/star-emoji.png"
              alt="star-emoji"
            />
          ))}
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/48/star-half-empty.png"
            alt="star-half-empty"
          />
        </div>
        <PriceRow>
          <Price>₹{price}</Price>
          <br />
          <button
            onClick={() => addProduct(_id)}
            style={{
              background: "linear-gradient(to bottom right, #6B46C1, #4299E1)",
              color: "#fff",
              fontWeight: "500",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              width: "100%",
              padding: "0.625rem 1.25rem",
              textAlign: "center",
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              transition: "background 0.3s ease-in-out",
              outline: "none",
              boxShadow: "0 0 10px rgba(66, 153, 225, 0.5)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to bottom left, #6B46C1, #4299E1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to bottom right, #6B46C1, #4299E1)")
            }
          >
            Add to cart
          </button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
