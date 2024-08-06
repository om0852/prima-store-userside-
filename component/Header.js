import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 50px;
  right: 0;
  left: 20px;
  bottom: 0;
  padding: 20px;
  display: block;
  background-color: #222;
  gap: 15px;
  @media screen and (min-width: 786px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
`;
const NavButton = styled.div`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: red;
  cursor: pointer;
  @media screen and (min-width:756px) {
    display: none;
  }
`;
const Header = () => {
  const { cartProducts } = useContext(CartContext);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>PrimaStore</Logo>
          <StyledNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Product</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
