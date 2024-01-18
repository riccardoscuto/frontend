import React, { useState } from 'react';
import {
    ChakraProvider, Box, Grid, Image, Text, Button, VStack, HStack, Badge, Flex, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure
} from '@chakra-ui/react';
import { useAccount } from "wagmi";

const nftData = [
    { id: 1, image: '', price: 500, amount: 1, borderColor: '#ffbe0b' },
    { id: 2, image: 'path-to-your-image-2', price: 1000, amount: 2, borderColor: '#fb5607' },
    { id: 3, image: 'path-to-your-image-3', price: 1500, amount: 4, borderColor: '#ff006e' },
    { id: 4, image: 'path-to-your-image-4', price: 1800, amount: 7, borderColor: '#8338ec' },
    { id: 5, image: 'path-to-your-image-5', price: 2000, amount: 10, borderColor: '#3a86ff' },
];

export default function NFTShop() {
    const { isConnected } = useAccount();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [claimed, setClaimed] = useState(Array(nftData.length).fill(false));

    const handleBuy = (price, amount) => {
        console.log(`Buying ${amount} NFT(s) for ${price} tokens`);
    };

    const handleClaim = (index) => {
        let newClaimed = [...claimed];
        newClaimed[index] = true;
        setClaimed(newClaimed);
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
                    <Text fontSize="2xl" fontWeight="bold">NFT Shop</Text>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                        {nftData.map((nft) => (
                            <VStack key={nft.id} p={4} borderRadius="md"  boxShadow="md" border="2px" borderColor={nft.borderColor}align="center" bg="transparent">
                                <Image src={nft.image} borderRadius="md" boxSize="150px" />
                                <Text fontWeight="bold">Price: {nft.price} Tokens</Text>
                                <HStack>
                                    
                                    <Text>{nft.amount} NFT(s)</Text>
                                </HStack>
                                <Button colorScheme="teal" onClick={() => handleBuy(nft.price, nft.amount)}>
                                    Buy
                                </Button>
                            </VStack>
                        ))}
                    </Grid>
                    <Button colorScheme="pink" onClick={onOpen}>Claim Coupon</Button>
                </VStack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Claim your Coupon</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                {nftData.map((item, index) => (
                                    <Flex key={item.id} justify="space-between" align="center" w="full" p={2}>
                                        <Image src={item.logo} boxSize="50px" borderRadius="full" alt={`Logo ${item.id}`} />
                                        <Text>Shop {item.id}</Text>
                                        <Button
                                            colorScheme="teal"
                                            onClick={() => handleClaim(index)}
                                            isDisabled={claimed[index]}
                                        >
                                            {claimed[index] ? 'Claimed' : 'Claim'}
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
