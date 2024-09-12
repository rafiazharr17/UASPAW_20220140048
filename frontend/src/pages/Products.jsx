import React from "react";
import ProductList from "../components/ProductList";
import { Box, Heading, Container } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading as="h2" size="xl" mb={6} color="brand.500">
          {searchTerm ? `Hasil Pencarian: ${searchTerm}` : "Semua Produk"}
        </Heading>
        <ProductList searchTerm={searchTerm} />
      </Box>
    </Container>
  );
};

export default Products;
