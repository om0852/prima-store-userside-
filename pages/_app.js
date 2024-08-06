import { CartContextProvider } from "@/component/CartContext";
import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
body{
  padding: 0;
  
}
`;
export default function App({ Component, pageProps }) {
  return (
    <>
    <GlobalStyles></GlobalStyles>
    <CartContextProvider>
        <Component {...pageProps} />;
    </CartContextProvider>
    </>
  );
}
