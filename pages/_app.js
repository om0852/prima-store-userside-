import { CartContextProvider } from "@/component/CartContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
body{
  padding: 0;
  overflow-x: hidden;
  
}
`;
export default function App({ Component,   pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
