import React from "react";
import {
  VStack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  Image,
  Container,
} from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h2" size="2xl" mb={4} color="brand.500">
            Tentang TokoKita
          </Heading>
          <Text fontSize="xl">
            Kami adalah platform e-commerce terpercaya yang menyediakan berbagai
            produk berkualitas.
          </Text>
        </Box>

        <SimpleGrid columns={[1, null, 2]} spacing={10}>
          <Box>
            <Heading as="h3" size="lg" mb={4} color="brand.500">
              Visi Kami
            </Heading>
            <Text>
              Menjadi platform e-commerce terdepan yang menghubungkan penjual
              dan pembeli di seluruh Indonesia, memberikan pengalaman berbelanja
              yang luar biasa dan mendukung pertumbuhan UMKM.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="lg" mb={4} color="brand.500">
              Misi Kami
            </Heading>
            <Text>
              1. Menyediakan platform yang aman dan terpercaya
              <br />
              2. Memberikan layanan pelanggan yang unggul
              <br />
              3. Mendukung pertumbuhan UMKM di Indonesia
              <br />
              4. Terus berinovasi dalam teknologi e-commerce
            </Text>
          </Box>
        </SimpleGrid>

        <Box>
          <Heading as="h3" size="lg" mb={4} color="brand.500">
            Tim Kami
          </Heading>
          <SimpleGrid columns={[2, null, 4]} spacing={6}>
            <TeamMember name="John Doe" position="CEO" />
            <TeamMember name="Jane Smith" position="CTO" />
            <TeamMember name="Mike Johnson" position="COO" />
            <TeamMember name="Sarah Lee" position="CMO" />
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

const TeamMember = ({ name, position }) => {
  return (
    <VStack>
      <Image
        borderRadius="full"
        boxSize="150px"
        src={`https://via.placeholder.com/150?text=${name.charAt(0)}`}
        alt={name}
        mb={2}
      />
      <Text fontWeight="bold">{name}</Text>
      <Text color="brand.500">{position}</Text>
    </VStack>
  );
};

export default About;
