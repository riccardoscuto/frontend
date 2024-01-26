import { Box, Button, Center, Container, Flex, Image, Progress, Text, useInterval, useToast } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useAccount, usePublicClient } from "wagmi";
import ModalImg, { ModalStatPlant } from "../Components/StatPlant";
// import MultiFeed from "../Components/MultiFeed";
import { Card, CardBody, CardFooter, useMediaQuery } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import mockup from '../mockup/mockup'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "../App.css"
import { useEffect, useState } from "react";
import { useWrite } from "../hook/useWrite";
import { useDisclosure } from "@chakra-ui/react"
import contract from "../constants/contract";
import { getBorderColor, getPlantImage, getPlantInfo, getUserInfo } from "../lib/info";


export default function Home() {
	const { isConnected, address } = useAccount()
	const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [indexPlant, setIndex] = useState(0);
	const [userInfo, setUserInfo] = useState(null);
	const publicClient = usePublicClient();
	const [idPlant, setIdPlant] = useState(0);
	const [arrayPlant, setArrayPlant] = useState([]);
	useEffect(() => {
		(async () => {
			const data = await getUserInfo(publicClient, address);
			setUserInfo({
				isStarted: data[0],
				feedTokens: data[1],
				ownedNFT: data[2],
				level: data[3],
				lastClaimTime: data[4]
			})
			const aux = []
			setIdPlant(data[2][0])
			for (let plantId of data[2]) {
				const info = await getPlantInfo(publicClient, plantId)
				aux.push({ level: info[0], id: plantId, owner: info[1] })
			}
			setArrayPlant(aux)
		})()
	}, [])

	useInterval(() => {
		(async () => {
			const data = await getUserInfo(publicClient, address);
			setUserInfo({
				isStarted: data[0],
				feedTokens: data[1],
				ownedNFT: data[2],
				level: data[3],
				lastClaimTime: data[4]
			})

			const aux = []
			for (let plantId of data[2]) {
				const info = await getPlantInfo(publicClient, plantId)

				aux.push({ level: info[0], id: plantId, owner: info[1] })
			}
			setArrayPlant(aux)
		})()
	}, 500)

	const levelUpTransaction = useWrite({
		abi: contract.plant.abi,
		address: contract.plant.address,
		args: [idPlant],
		enabled: isOpen && userInfo && userInfo.feedTokens >= 100n && (arrayPlant[indexPlant].level < 5n),
		functionName: "levelUp",
		value: BigInt(0)
	});

	const claimTransaction = useWrite({
		abi: contract.plant.abi,
		address: contract.plant.address,
		args: [100n],
		enabled: userInfo && userInfo.isStarted,
		functionName: "addFeedTokens",
		value: BigInt(0)
	})

	const mintTransaction = useWrite({
		abi: contract.plant.abi,
		address: contract.plant.address,
		args: [],
		enabled: userInfo && userInfo.feedTokens >= 100n,
		functionName: "mintPlant",
		value: BigInt(0)
	})

	const startUserTransaction = useWrite({
		abi: contract.plant.abi,
		address: contract.plant.address,
		args: [],
		enabled: userInfo && !userInfo.isStarted,
		functionName: "startUser",
		value: BigInt(0)
	});

	const claimFeedTransaction = useWrite({
		abi: contract.plant.abi,
		address: contract.plant.address,
		args: [],
		enabled: userInfo && userInfo.isStarted,
		functionName: "claimFeedTokens",
		value: BigInt(0)
	});


	const levelUp = async () => {
		console.log("Level Up");
		await levelUpTransaction.write?.();
	};
	const claim = async () => {
		console.log("Level Up");
		await claimFeedTransaction.write?.();
	};
	const switchRight = () => {
		if (indexPlant < (arrayPlant.length - 1)) {
			setIndex(indexPlant + 1);
			setIdPlant(arrayPlant[indexPlant + 1].id)
		}
	}
	const switchLeft = () => {
		if (indexPlant != 0) {
			setIndex(indexPlant - 1);
			setIdPlant(arrayPlant[indexPlant - 1].id)
		}
	}
	const startUser = async () => {
		console.log("start User")
		await startUserTransaction.write?.();
	}
	const claimFeedToken = async () => {
		console.log("claimFeedToken")
		await claimTransaction.write?.();
	}
	const mint = async () => {
		console.log("minted plant")
		await mintTransaction.write?.();
	}


	if (isConnected) {
		if (userInfo) {
			if (userInfo.isStarted) {
				return (
					<>
						<Container maxW="full" centerContent height="100%">
							<Splide aria-label="Images"
								options={{
									rewind: true,
									width: isSmallerThan768 ? "100%" : "1060px",
									perPage: isSmallerThan768 ? 1 : 3,
									gap: '1rem',
									rewindByDrag: true,
									drag: 'free',
									snap: true,
									keyboard: 'global',
									padding: isSmallerThan768 ? 0 : 10,
									fixedWidth: isSmallerThan768 ? 280 : 300,
								}}>
								{arrayPlant &&
									arrayPlant.map((element, index) => (
										<SplideSlide key={index}>
											<Card m={2} borderRadius="8px" overflow="hidden" flex="0 0 auto" className={`${getBorderColor(element.level)}`} style={{
												borderRadius: '8px',
												padding: '4px',
												boxSizing: 'border-box',
											}}>
												<CardBody borderRadius="4px" backgroundColor="teal.800"  >
													<ModalImg height="100%" width="100px" img={getPlantImage(element.level)} info={["level: " + element.level]} text={element.id} onOpen={() => { setIndex(index); setIdPlant(element.id); onOpen() }} />
												</CardBody>
												<CardFooter>
													<Text fontSize="16px" color="black">
														Level: {element.level.toString()}
													</Text>
												</CardFooter>
											</Card>
										</SplideSlide>

									))}
							</Splide>
							{arrayPlant.length > 0 && <ModalStatPlant plant={arrayPlant[indexPlant]} isOpen={isOpen}
								onClose={onClose} levelUp={levelUp} switchLeft={switchLeft} switchRight={switchRight} isActive={isOpen && userInfo && userInfo.feedTokens >= 100n && (arrayPlant[indexPlant].level < 5n)} />
							}
							<Flex width="100%" gap={10} direction={"row"} justifyContent={"center"}>
								<Button>
									<ChakraLink as={ReactRouterLink} to="/redeem">
										Redeem
									</ChakraLink>
								</Button>
								<Button onClick={claimFeedToken}>
									Add Feed Token
								</Button>
								<Button onClick={claim}>
									Claim
								</Button>
								<Button onClick={mint}>
									Mint plant
								</Button>

							</Flex>
							{userInfo && (
								<div style={{ marginTop: '20px', width: '500px' }}>
									<Progress
										value={Math.max(0,(((((Date.now() / 1000) - Number(userInfo.lastClaimTime.toString())) / 3600) / 48) * 100))}
										colorScheme="teal"
										height="30px" // Aumenta l'altezza della barra
										borderRadius="15px" // Angoli arrotondati
										style={{
											background: `linear-gradient(
                                                to right, 
                                                #00C9FF 0%, 
                                                #92FE9D ${(((((Date.now() / 1000) - Number(userInfo.lastClaimTime.toString())) / 3600) / 48) * 100)}%, 
                                                #E8E8E8 ${(((((Date.now() / 1000) - Number(userInfo.lastClaimTime.toString())) / 3600) / 48) * 100)}%, 
                                                #E8E8E8 100%
                                            )`
										}}
									/>
								</div>
							)}

							<div style={{
								fontSize: '24px', 
								fontWeight: 'bold', 
								fontFamily: 'Courier New, monospace', // Cambia il font
								margin: '20px 0' // Aggiungi margini
							}}>
								{Math.max(0,Math.round(((((Date.now() / 1000) - Number(userInfo.lastClaimTime.toString())) / 3600))) % 24)}:
								{Math.max(0,Math.round(((((Date.now() / 1000) - Number(userInfo.lastClaimTime.toString())) / 60))) % 60)}:
								{Math.max(0,Math.round(((((Date.now() / 1000) - Number(userInfo.lastClaimTime.toString()))))) % 60)}
							</div>

							<Flex width={"500px"} height={"500px"}>
							</Flex>

						</Container >
					</>
				)

			} else return (
				<>
					<Flex justifyContent="space-around" alignItems="center">
						<Button onClick={startUser}>
							Start User
						</Button>
					</Flex>
				</>
			)
		}
	} else return (
		<Container p={0} maxW={"full"} className="scroll-container">
			<Box
				pos="relative"
				className="scroll-section"
				p={0} >
				<Box
					bgImage={`url(/sfondo.jpg)`}
					bgSize="cover"
					zIndex={0}
					bgPosition="center"
					bgRepeat="no-repeat"
					h="100%"
					w="100%"
					filter="brightness(40%) blur(2px) grayscale(0.2)"
				/>
				<Flex
					pos="absolute"
					top="20%"
					left="0%"
					w={"100%"}
					direction="column"
					textAlign="center"
					color="white"
				>
					<Image src="/Logo_no_slogan.png" m={"auto"} w={"300px"} h={"auto"} borderRadius={10}></Image>
					<Text mt={10} textAlign={"center"} whiteSpace={"pre-line"} fontSize={{ base: '30px', md: '40px' }} color={"white"} fontWeight={500} height="100%" width="100%">

						Get value from your feedbacks!
					</Text>
				</Flex>
			</Box>
			{!isSmallerThan768 && (
				<>
					<Box
						pos="relative"
						className="scroll-section" >
						<Box w={"100%"} h={"100%"} bgImage={"/Febaval_homepage_presentation_1.png"} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}></Box>
					</Box>
					<Box
						pos="relative"
						className="scroll-section" >
						<Box w={"100%"} h={"100%"} bgImage={"/Febaval_homepage_presentation_2.png"} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}></Box>
					</Box>
					<Box
						pos="relative"
						className="scroll-section" >
						<Box w={"100%"} h={"100%"} bgImage={"/Febaval_homepage_presentation_3.png"} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}></Box>
					</Box>

				</>
			)}
			{isSmallerThan768 && (
				<>
					<Flex
						pos="relative"
						className="scroll-section"
						direction={"column"}
					>
						<Box w={"100%"} h={"100%"} bgImage={"/Febaval_homepage_presentation_1.png"} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}></Box>
						<Box w={"100%"} h={"100%"} bgImage={"/Febaval_homepage_presentation_2.png"} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}></Box>
						<Box w={"100%"} h={"100%"} bgImage={"/Febaval_homepage_presentation_3.png"} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}></Box>
					</Flex>
				</>
			)}
		</Container>
	);
}



