import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CartProvider } from "./context/CartContext";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e6f5e6",
      100: "#c2e5c2",
      200: "#9ad49a",
      300: "#71c371",
      400: "#4db34d",
      500: "#42b549", // Tokopedia green
      600: "#3a9f40",
      700: "#318836",
      800: "#28712c",
      900: "#1f5a22",
    },
  },
  fonts: {
    heading: "Open Sans, sans-serif",
    body: "Open Sans, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
