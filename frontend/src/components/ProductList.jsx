import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link as RouterLink } from "react-router-dom";
import {
  VStack,
  Heading,
  Button,
  SimpleGrid,
  Box,
  Text,
  Link,
  Image,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    sortProducts();
  }, [sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`, {
        params: { search: searchTerm },
      });
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h2" size="xl">
        Daftar Produk
      </Heading>
      <Button onClick={toggleSortOrder} colorScheme="green">
        Urutkan berdasarkan Harga (
        {sortOrder === "asc" ? "Rendah ke Tinggi" : "Tinggi ke Rendah"})
      </Button>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <Image
              src={`/images/${product.image}`}
              alt={product.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <Box p={4} flex="1" display="flex" flexDirection="column">
              <Heading as="h3" size="md" mb={2} height="48px" overflow="hidden">
                {product.name}
              </Heading>
              <Text fontWeight="bold" color="green.500" mb={2}>
                Rp{product.price.toLocaleString()}
              </Text>
              <Text noOfLines={2} mb={4} flex="1">
                {product.description}
              </Text>
              <Flex mt="auto">
                <Link
                  as={RouterLink}
                  to={`/products/${product.id}`}
                  flex="1"
                  mr={2}
                >
                  <Button colorScheme="green" variant="outline" width="full">
                    Detail
                  </Button>
                </Link>
                <Button
                  onClick={() => addToCart(product)}
                  colorScheme="green"
                  width="full"
                  flex="1"
                >
                  Tambah
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ProductList;
