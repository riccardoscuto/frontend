import React, { useState } from 'react';
import {
    ChakraProvider, Box, Grid, Image, Text, Button, VStack, HStack, Flex, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center
} from '@chakra-ui/react';
import { useAccount } from "wagmi";


const initialcouponData = [
    { id: 1, image: '/discount1.png', price: 500, amount: 10+"$", borderColor: '#ffbe0b' },
    { id: 2, image: '/discount2.png', price: 1000, amount: 15+"$", borderColor: '#fb5607' },
    { id: 3, image: '/discount3.png', price: 2000, amount: 30+"$", borderColor: '#ff006e' },
];

const initialShops = [
    { id: 1, name: 'Sunflower E-Shop', image: '/shop1.png', claimed: false },
    { id: 2, name: 'OceanWave Electronics', image: '/shop2.png', claimed: false },
    { id: 3, name: 'DigitalSunset', image: '/shop3.png', claiminitialcouponed: false },
    { id: 4, name: 'Datastream Mako', image: '/shop4.png', claimed: false },
    { id: 5, name: 'GreenByte Store', image: '/shop5.png', claimed: false },
];

export default function couponShop() {
    const { isConnected } = useAccount();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [couponData] = useState(initialcouponData);
    const [shopData, setShopData] = useState(initialShops.map(shop => ({ ...shop, claimed: false })));

    const resetShops = () => {
        setShopData(initialShops.map(shop => ({ ...shop, claimed: false })));
    };

    const handleBuy = () => {
        resetShops();
        onOpen();
    };

    const handleClaim = (shopIndex) => {
        let newShopData = [...shopData];
        newShopData[shopIndex].claimed = true;
        setShopData(newShopData);
    };

    if (!isConnected) {
        return (
            <Flex justifyContent={"center"}>
                <h1>Login required</h1>
            </Flex>
        );
    }

    return (
        <ChakraProvider>
            <Box p={5} maxW="1200px" mx="auto">
                <VStack spacing={5}>
                    <Text fontSize="2xl" fontWeight="bold">Trade Coupon</Text>
                    <Center>
                        <HStack spacing={6} justify="center">
                            {couponData.map((coupon, index) => (
                                <VStack key={coupon.id} p={4} borderRadius="md" boxShadow="md" border="2px" borderColor={coupon.borderColor} align="center" bg="transparent">
                                    <Image src={coupon.image} borderRadius="md" boxSize="150px" />
                                    <Text fontWeight="bold">Price: {coupon.price} Tokens</Text>
                                    <Text>{coupon.amount}</Text>
                                    <Button colorScheme="teal" onClick={handleBuy}>
                                        Buy
                                    </Button>
                                </VStack>
                            ))}
                        </HStack>
                    </Center>
                </VStack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Claim your Coupon</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                {shopData.map((shop, index) => (
                                    <Flex key={shop.id} direction="row" justify="space-around" align="center" w="full" p={2}>
                                        <Image src={shop.image} boxSize="50px" borderRadius="full" alt={`Logo ${shop.name}`} />
                                        <Center flex="1">
                                            <Text>{shop.name}</Text>
                                        </Center>
                                        <Button
                                            colorScheme="teal"
                                            onClick={() => handleClaim(index)}
                                            isDisabled={shop.claimed}
                                        >
                                            {shop.claimed ? 'Claimed' : 'Claim'}
                                        </Button>
                                    </Flex>
                                ))}
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </ChakraProvider>
    );
}
