"use client";
import { CartContext } from "@/component/CartContext";
import Center from "@/component/Center";
import Filter from "@/component/Filter";
import Header from "@/component/Header";
import { ProductGrid } from "@/component/NewProducts";
import ProductBox from "@/component/ProductBox";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 2vh;
`;
const ProductPage = () => {
  const { filter, setFilter, selectedCategory } = useContext(CartContext);
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    axios
      .post("/api/allproducts", { filter: selectedCategory })
      .then((Res) => setAllProduct(Res.data));
  }, [selectedCategory]);
  // console.log(allProduct)
  return (
    <>
      <Filter />
      <div
        onClick={() => {
          if (filter == true) setFilter(false);
        }}
      >
        <Header />
        <Center>
          <div className="flex flex-row items-center justify-between px-4">
            <Title>All Products</Title>
            <svg
              onClick={() => setFilter(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          </div>

          <ProductGrid>
            {allProduct &&
              allProduct?.map((product, index) => (
                <ProductBox key={index} {...product} />
              ))}
          </ProductGrid>
        </Center>
      </div>
    </>
  );
};

// export async function getServerSideProps() {
//   await connectToDB();
//   const newProduct = await Product.find({newProduct:filter}, null, { sort: { _id: -1 } });
//   // const filterData = newProduct.filter(()=>{

//   // })
//   return {
//     props: {
//       allProduct: JSON.parse(JSON.stringify(newProduct)),
//     },
//   };
// }

export default ProductPage;
