import React, { useEffect, useState } from 'react';
import {
    ChakraProvider, Box, Grid, Image, Text, Button, VStack, HStack, Flex, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center, useInterval
} from '@chakra-ui/react';
import { useAccount } from "wagmi";
import { getCouponImage, getItemInfo, getTotalCoupon, getUserInfo } from '../lib/info';
import { usePublicClient } from "wagmi";
import { useWrite } from '../hook/useWrite';
import contract from '../constants/contract';



const initialcouponData = [
    { id: 1, image: '/discount1.png', price: 500, amount: 10 + "$", borderColor: '#ffbe0b' },
    { id: 2, image: '/discount2.png', price: 1000, amount: 15 + "$", borderColor: '#fb5607' },
    { id: 3, image: '/discount3.png', price: 1500, amount: 30 + "$", borderColor: '#ff006e' },
];

const initialShops = [
    { id: 1, name: 'Sunflower E-Shop', image: '/shop1.png', claimed: false },
    { id: 2, name: 'OceanWave Electronics', image: '/shop2.png', claimed: false },
    { id: 3, name: 'DigitalSunset', image: '/shop3.png', claimed: false },
    { id: 4, name: 'Datastream Mako', image: '/shop4.png', claimed: false },
    { id: 5, name: 'GreenByte Store', image: '/shop5.png', claimed: false },
];

export default function couponShop() {
    const { isConnected, address } = useAccount();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [couponData] = useState(initialcouponData);
    const [shopData, setShopData] = useState(initialShops.map(shop => ({ ...shop, claimed: false })));
    const [selectedPrice, setSelectedPrice] = useState(500);
    const [mapShop, setMapShop] = useState({ 500: [] });
    const [selectedId, setSelectedId] = useState(undefined);
    const [userToken, setUserToken] = useState(0n);
    const publicClient = usePublicClient();
    useEffect(() => {
        (async () => {
            const totalCoupon = await getTotalCoupon(publicClient);
            const aux = {}
            for (let i = 1; i < totalCoupon; i++) {
                const info = await getItemInfo(publicClient, i)
                if (!aux[info[0]])
                    aux[info[0]] = []
                const elementToAdd = { id: i, price: info[0], claimed: !info[2], quantity: info[1], ...getCouponImage(aux[info[0]].length) }
                aux[info[0]].push(elementToAdd)
            }
            setMapShop(aux)
        })()
    }, [])
    //const data = await getUserInfo(publicClient, address);
    useInterval(() => {
        (async () => {
            const data = await getUserInfo(publicClient, address);
            setUserToken(data[1])
        
        })()

    }, 1000)


    const buyStoreItemTransaction = useWrite({
        abi: contract.market.abi,
        address: contract.market.address,
        args: [selectedId],
        enabled: selectedId != undefined &&  userToken.toString() >= selectedPrice,
        functionName: "buyStoreItem",
        value: BigInt(0)
    })
    useEffect(() => {
        (async () => {
            if (selectedId != undefined)
                buyStoreItemTransaction.write?.();
            console.log(selectedId != undefined &&  userToken.toString() >= selectedPrice)
        })()
    }, [selectedId])
    const resetShops = () => {
        setShopData(initialShops.map(shop => ({ ...shop, claimed: false })));
    };

    const handleBuy = (price) => {
        setSelectedPrice(price)
        // resetShops();
        onOpen();
    };

    const handleClaim = (id) => {
        setSelectedId(id)
        // let newShopData = [...shopData];
        // newShopData[shopIndex].claimed = true;
        // setShopData(newShopData);
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
                                    <Text fontWeight="bold">Price: {coupon.price} Feed Tokens</Text>
                                    <Text>{coupon.amount}</Text>
                                    <Button colorScheme="teal" onClick={() => { handleBuy(coupon.price) }}>
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
                                {mapShop[selectedPrice].map((shop, index) => (
                                    <Flex key={shop.id} direction="row" justify="space-around" align="center" w="full" p={2}>
                                        <Image src={shop.image} boxSize="50px" borderRadius="full" alt={`Logo ${shop.name}`} />
                                        <Center flex="1">
                                            <Text>{shop.name}</Text>
                                        </Center>
                                        <Button
                                            colorScheme="teal"
                                            onClick={() => handleClaim(shop.id)}
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
