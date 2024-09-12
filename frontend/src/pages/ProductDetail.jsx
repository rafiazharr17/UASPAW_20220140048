import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  Skeleton,
  useToast,
  Flex,
  Image,
} from "@chakra-ui/react";

const API_URL = "http://localhost:5000/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Gagal mengambil detail produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Produk ditambahkan",
      description: `${product.name} telah ditambahkan ke keranjang.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="400px" />
          <Skeleton height="40px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box p={4} borderRadius="md" bg="red.100" color="red.700">
          {error}
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box p={4} borderRadius="md" bg="yellow.100" color="yellow.700">
          Produk tidak ditemukan
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} spacing={8}>
        <Box flex={1} mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            borderRadius="md"
            objectFit="cover"
            w="100%"
            maxH="400px"
          />
        </Box>
        <VStack flex={1} align="stretch" spacing={6}>
          <Heading as="h2" size="xl" color="brand.500">
            {product.name}
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            Rp{product.price.toLocaleString()}
          </Text>
          <Badge colorScheme="green" fontSize="md" p={2} alignSelf="flex-start">
            Stok: {product.stock || "Tersedia"}
          </Badge>
          <Text fontSize="lg">{product.description}</Text>
          <Button
            onClick={handleAddToCart}
            colorScheme="brand"
            size="lg"
            leftIcon={
              <span role="img" aria-label="cart">
                🛒
              </span>
            }
          >
            Tambahkan ke Keranjang
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default ProductDetail;
