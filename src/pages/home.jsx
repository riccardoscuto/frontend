import { Box, Button, Center, Container, Flex, Image, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useAccount, usePublicClient } from "wagmi";
import ModalImg, { ModalStatPlant } from "../Components/StatPlant";
import MultiFeed from "../Components/MultiFeed";
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
import { getPlantImage, getPlantInfo, getUserInfo } from "../lib/info";


const HomepageText = "Unlock a world of growth and rewards! Leave feedback for your exclusive Febaval codes.\n\nClaim it, earn feed tokens, and cultivate virtual plants. Sign up, mint your sprout, and earn value tokens for exciting rewards.\n\nYour journey to extraordinary interactions starts here!"

export default function Home() {
	const { isConnected, address } = useAccount()
	const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [indexPlant, setIndex] = useState(0);
	const [userInfo, setUserInfo] = useState(null);
	const publicClient = usePublicClient();
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
			console.log(data)
			const aux = []
			for (let plantId of data[2]) {
				const info = await getPlantInfo(publicClient, plantId)
				console.log(info)
				aux.push({ level: info[0], id: plantId, owner: info[1] })
			}
			setArrayPlant(aux)
		})()






	}, [])




	const levelUpTransaction = useWrite({
		abi: contract.abi,
		address: contract.address,
		args: [indexPlant],
		enabled: true,
		functionName: "levelUp",
		value: BigInt(0)
	});
	const startUserTransaction = useWrite({
		abi: contract.abi,
		address: contract.address,
		args: [],
		enabled: true,
		functionName: "startUser",
		value: BigInt(0)
	});
	const levelUp = async () => {
		console.log("Level Up");
		console.log(levelUpTransaction.error, levelUpTransaction.prepareError,);
		await levelUpTransaction.write?.();
	};
	const switchRight = () => {
		if (indexPlant < (arrayPlant.length - 1))
			setIndex(indexPlant + 1);
	}
	const switchLeft = () => {
		if (indexPlant != 0)
			setIndex(indexPlant - 1);
	}
	const startUser = async () => {
		console.log("start User")
		await startUserTransaction.write?.();

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
													<ModalImg height="100%" width="100px" img={getPlantImage(element.level)} info={[]} text={element.id} onOpen={() => { setIndex(index); onOpen() }} />

												</CardBody>
												<CardFooter>
													<Text fontSize="16px" color="black">
														{element.text}
													</Text>
												</CardFooter>
											</Card>
										</SplideSlide>

									))}
							</Splide>
							{arrayPlant.length>0 && <ModalStatPlant plant={arrayPlant[indexPlant]} isOpen={isOpen}
								onClose={onClose} levelUp={levelUp} switchLeft={switchLeft} switchRight={switchRight} />
							}
							<Flex width="100%" gap={10} direction={"row"} justifyContent={"center"}>
								<Button>
									<ChakraLink as={ReactRouterLink} to="/redeem">
										Redeem
									</ChakraLink>
								</Button>
								<MultiFeed mokupInfo={mockup} >

								</MultiFeed>
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
	}
	else return (

		<Container p={0} maxW="container.xl" height="100%" >
			<Box
				pos="relative"
				h="90vh" >
				<Box
					bgImage={`url(/sfondo.jpg)`}
					bgSize="cover"
					zIndex={-1}
					bgPosition="center"
					bgRepeat="no-repeat"
					h="100%"
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
			<Box m={4}>
				<Flex mt={{ base: 20, md: 40 }} justifyContent={"center"}>
					<Card h={"fit-content"} w={"fit-content"} >
						<CardBody h={"fit-content"} w={"fit-content"}>
							<Image src="/Febaval_plant_details_updated.png" w={"auto"} h={"auto"} maxHeight={400} objectFit={"contain"}>

							</Image>

						</CardBody>
					</Card>
				</Flex>
				<Flex direction={"row"} mt={{ base: 20, md: 40 }} alignItems={"center"} justifyContent={"space-evenly"} h={{ base: '10vh', md: '40vh' }}>
					<Card w={"auto"} h={"100%"} background={"teal.700"}>
						<Image src="/plant_lv1.webp" w={"100%"} h={"100%"} transform={"scale(0.9, 0.9)"} >
						</Image>
					</Card>
					<ChevronRightIcon fontSize={{ base: 30, md: 60 }} />
					<Card w={"auto"} h={"100%"} background={"teal.700"}>
						<Image src="/plant_lv3.webp" w={"100%"} h={"100%"} transform={"scale(0.9, 0.9)"} >
						</Image>
					</Card>
					<ChevronRightIcon fontSize={{ base: 30, md: 60 }} />
					<Card w={"auto"} h={"100%"} background={"teal.700"}>
						<Image src="/plant_lv5.webp" w={"100%"} h={"100%"} transform={"scale(0.9, 0.9)"} >
						</Image>
					</Card>

				</Flex>
				<Card mt={{ base: 20, md: 40 }} mb={20}>
					<CardBody>
						<Flex
							direction={{ base: 'column', md: 'row' }} // Stack columns on small screens and use rows on medium screens and above
							align={{ base: 'center', md: 'flex-start' }} // Center content on small screens and align to the start on medium screens and above
							justify="center"
							gap={{ base: 4, md: 10 }} // Adjust spacing based on screen size
						>
							<Image src="/Febaval_presentation_updated.png" height="auto" width={{ base: '100%', md: '50%' }} /> {/* Adjust width based on screen size */}
							<Box>
								<Text whiteSpace={"pre-line"} fontSize={{ base: '18px', md: '25px' }} fontWeight={500} height="100%" width="100%">
									{HomepageText}
								</Text>
							</Box>
						</Flex>
						<Flex justifyContent="center" marginTop={{ base: 4, md: 50 }}>
							{/* Include your ConnectButton component here */}
						</Flex>
					</CardBody>
				</Card>
			</Box>
		</Container>

	);
}

function getBorderColor(level) {
	switch (level) {
		case "Level: 1":
			return "level1";
		case "Level: 2":
			return 'level2'; // Change this to the desired color for level 2
		case "Level: 3":
			return 'level3'; // Change this to the desired color for level 3
		case "Level: 4":
			return 'level4'; // Change this to the desired color for level 4
		case "Level: 5":
			return 'level5'; // Change this to the desired color for level 5
		// Add more cases for other levels if needed
		default:
			console.log('Invalid level: ' + level);
			return 'level1'; // Default color if level is not specified
	}
}

