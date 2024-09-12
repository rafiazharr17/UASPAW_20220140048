import React from 'react';
import { useCart } from '../context/CartContext';
import { Box, VStack, Heading, Text, Button, Divider, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} bg="white" shadow="md">
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="md">Keranjang Belanja</Heading>
        <Divider />
        {cart.length === 0 ? (
          <Text>Keranjang Anda kosong.</Text>
        ) : (
          <>
            {cart.map((item) => (
              <Flex key={item.id} justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text color="gray.600">Rp{item.price.toLocaleString()}</Text>
                </Box>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Hapus item"
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                />
              </Flex>
            ))}
            <Divider />
            <Flex justify="space-between" fontWeight="bold">
              <Text>Total:</Text>
              <Text>Rp{total.toLocaleString()}</Text>
            </Flex>
            <Button colorScheme="green" size="md" width="full">
              Lanjutkan ke Pembayaran
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Cart;