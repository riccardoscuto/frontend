import { Box, Button, Container, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ModalImg from "../Components/StatPlant";
import MultiFeed from "../Components/MultiFeed";
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import mockup from '../mockup/mockup'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "../App.css"


const HomepageText = "Unlock a world of growth and rewards! Leave feedback for your exclusive Febaval codes.\n\nClaim it, earn feed tokens, and cultivate virtual plants. Sign up, mint your sprout, and earn value tokens for exciting rewards.\n\nYour journey to extraordinary interactions starts here!"

export default function Home() {
	const { isConnected } = useAccount()
	if (isConnected) {
		return (
			<>
				<Container maxW="full" centerContent height="100%">
					<Splide aria-label="Images"
						options={{
							rewind: true,
							width: "63%",
							perPage: 3,
							gap: '1rem',
							rewindByDrag: true,
							drag: 'free',
							snap: true,
							keyboard: 'global',
							padding: 10,
							fixedWidth: 300,
						}}>

						{mockup &&
							mockup.map((element, index) => (
								<SplideSlide key={index}>
									<Card m={2} borderRadius="8px" overflow="hidden" flex="0 0 auto" className={`${getBorderColor(element.info[0])}`} style={{
										borderRadius: '8px',
										padding: '4px',
										boxSizing: 'border-box',
									}}>
										<CardBody borderRadius="4px" backgroundColor="teal.800" >
											<ModalImg height="100%" width="100px" img={element.img} info={element.info} text={element.text} />

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
					<Flex width="15%" justifyContent={"space-between"}>
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

	}
	else return (

		<Container maxW="container.xl" height="100%">
			<Box mt={4}>
				<Card>
					<CardBody>
						<Flex gap={10} justify="center">
							<Image src="/home1.png" height="auto" width="50%" />
							<Box>
								<Text whiteSpace={"pre-line"} fontSize="25px" fontWeight={500} height="100%" width="100%">
									{HomepageText}
								</Text>
							</Box>
						</Flex>
						<Flex justifyContent="center" marginTop={50}>
							<ConnectButton />
						</Flex>
					</CardBody>
				</Card>
			</Box>
		</Container >

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

