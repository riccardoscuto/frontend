import { Box, Button, Container, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ModalImg from "../Components/StatPlant";
import MultiFeed from "../Components/MultiFeed";
import { Card, CardBody, CardFooter, useMediaQuery } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import mockup from '../mockup/mockup'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "../App.css"


const HomepageText = "Unlock a world of growth and rewards! Leave feedback for your exclusive Febaval codes.\n\nClaim it, earn feed tokens, and cultivate virtual plants. Sign up, mint your sprout, and earn value tokens for exciting rewards.\n\nYour journey to extraordinary interactions starts here!"

export default function Home() {
	const { isConnected } = useAccount()
	const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');

	if (isConnected) {
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

						{mockup &&
							mockup.map((element, index) => (
								<SplideSlide key={index}>
									<Card m={2} borderRadius="8px" overflow="hidden" flex="0 0 auto" className={`${getBorderColor(element.info[0])}`} style={{
										borderRadius: '8px',
										padding: '4px',
										boxSizing: 'border-box',
									}}>
										<CardBody borderRadius="4px" backgroundColor="teal.800"  >
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

	}
	else return (

		<Container maxW="container.xl" height="100%">
			<Box mt={4}>
				<Card>
					<CardBody>
						<Flex
							direction={{ base: 'column', md: 'row' }} // Stack columns on small screens and use rows on medium screens and above
							align={{ base: 'center', md: 'flex-start' }} // Center content on small screens and align to the start on medium screens and above
							justify="center"
							gap={{ base: 4, md: 10 }} // Adjust spacing based on screen size
						>
							<Image src="/home1.png" height="auto" width={{ base: '100%', md: '50%' }} /> {/* Adjust width based on screen size */}
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

