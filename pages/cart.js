import Center from "@/component/Center";
import Header from "@/component/Header";
import React from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
`;

const CartPage = () => {
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>1</Box>
          <Box>2</Box>
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
