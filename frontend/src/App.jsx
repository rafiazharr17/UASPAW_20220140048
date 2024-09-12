import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { Box, Flex, Heading, Link, Container, VStack } from "@chakra-ui/react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar"; // Kita akan membuat komponen ini

function App() {
  return (
    <Router>
      <Flex minHeight="100vh" direction="column">
        <Box as="header" bg="green.500" color="white" py={4}>
          <Container maxW="container.xl">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h1" size="lg">
                TokoPonsel
              </Heading>
              <SearchBar /> {/* Komponen SearchBar baru */}
              <Flex as="nav">
                <Link as={RouterLink} to="/" mr={4}>
                  Beranda
                </Link>
                <Link as={RouterLink} to="/products" mr={4}>
                  Produk
                </Link>
                <Link as={RouterLink} to="/about">
                  Tentang Kami
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Box>

        <Container maxW="container.xl" flex="1" py={8}>
          <Flex>
            <VStack flex={1} mr={8} align="stretch" spacing={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </VStack>
            <Box
              width="300px"
              position="sticky"
              top="20px"
              alignSelf="flex-start"
            >
              <Cart />
            </Box>
          </Flex>
        </Container>

        <Box as="footer" bg="gray.100" color="gray.600" p={4} mt="auto">
          <Container maxW="container.xl" textAlign="center">
            <p>&copy; 2024 TokoPonsel. Hak Cipta Dilindungi.</p>
          </Container>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
