"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
const StyledHeader = styled.header`
  background-color: white;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  z-index: 101;
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${(props) => (props?.mobileNavActive ? `display:block;` : `display:none;`)}
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  padding: 70px 20px 20px;
  background-color: white;
  z-index: 100;
  gap: 15px;
  @media screen and (min-width: 786px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:black;
  font-weight: 500;

  margin: 2vh 0;
  text-decoration: none;
  @media screen and (min-width: 786px) {
    padding: 0;
    margin: 0;
  }
`;
const NavButton = styled.div`
  background-color: transparent;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 101;
  border: 0;
  color: red;
  cursor: pointer;
  @media screen and (min-width: 756px) {
    display: none;
  }
`;
const Header = () => {
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Toaster/>
      <Center>
        <Wrapper>
          <Logo href={"/"}><img src="/newlogo.png" width={70}/><span className="text-black relative top-[20px]" style={{position:"relative",top:"-5px"}}>Store</span></Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Product</NavLink>
            <NavLink href={"/myorders"}>My Orders</NavLink>
            <NavLink href={"/cart"}>Cart({cartProducts.length})</NavLink>
            <NavLink href={"/login"} style={{color:"red",fontWeight:700}} onClick={() => signOut()}>
              Logout
            </NavLink>
          </StyledNav>
          <NavButton
            onClick={() => {
              setMobileNavActive((prev) => !prev);
            }}
          >
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
