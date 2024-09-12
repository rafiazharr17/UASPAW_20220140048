import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Box,
  SimpleGrid,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products`);
        // Ambil 4 produk pertama sebagai produk unggulan
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h2" size="xl" mb={4}>
        Merek Handphone Populer
      </Heading>
      <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
        <BrandItem name="Apple" logo="/images/apple-logo.jpg" />
        <BrandItem name="Samsung" logo="/images/samsung-logo.jpg" />
        <BrandItem name="Google" logo="/images/google-logo.jpg" />
        <BrandItem name="Asus ROG" logo="/images/rog-logo.jpg" />
        <BrandItem name="Xiaomi" logo="/images/xiaomi-logo.jpg" />
      </SimpleGrid>

      <Heading as="h2" size="xl" mb={4}>
        Produk Unggulan
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height="200px" borderRadius="lg" />
              ))
          : featuredProducts.map((product) => (
              <FeaturedProduct
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
      </SimpleGrid>

      <Box textAlign="center" mt={8}>
        <Button as={RouterLink} to="/products" colorScheme="brand" size="lg">
          Lihat Semua Produk
        </Button>
      </Box>
    </VStack>
  );
};

const BrandItem = ({ name, logo }) => (
  <Flex
    direction="column"
    align="center"
    p={4}
    borderWidth={1}
    borderRadius="lg"
    cursor="pointer"
    _hover={{ boxShadow: "md" }}
  >
    <Image src={logo} alt={name} height="50px" mb={2} />
    <Text fontWeight="bold">{name}</Text>
  </Flex>
);

const FeaturedProduct = ({ id, name, price, image }) => (
  <Box
    borderWidth={1}
    borderRadius="lg"
    overflow="hidden"
    display="flex"
    flexDirection="column"
    height="100%"
  >
    <Image
      src={`/images/${image}`}
      alt={name}
      height="200px"
      width="100%"
      objectFit="cover"
    />
    <Box p={4} flex="1" display="flex" flexDirection="column">
      <Heading as="h3" size="md" mb={2} height="48px" overflow="hidden">
        {name}
      </Heading>
      <Text fontWeight="bold" color="brand.500" mb={2}>
        Rp{price.toLocaleString()}
      </Text>
      <Button
        as={RouterLink}
        to={`/products/${id}`}
        colorScheme="brand"
        variant="outline"
        size="sm"
        mt="auto"
        width="full"
      >
        Lihat Detail
      </Button>
    </Box>
  </Box>
);

export default Home;
