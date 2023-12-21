import { Box, Button, Container, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ModalImg from "../Components/StatPlant";
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import mockup from '../mockup/mockup'
import { Splide, SplideSlide } from '@splidejs/react-splide';



const HomepageText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const PlantText = "plant name"
const arrayInfo = ["Level: 1", "Date: 04/12/2023", "Earnings: 20 ETH"]
const plantImg = "/home2.png"

export default function Home() {
	const { isConnected } = useAccount()
	const { isOpen, onOpen, onClose } = useDisclosure()

	if (isConnected) {

		return (


			<>
				<Container maxW="full" centerContent height="100%">

					<Splide aria-label="Images"
						options={{
							rewind: true,
							width: "70%",
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
									<Card m={2} borderRadius="8px" overflow="hidden" flex="0 0 auto">
										<CardBody backgroundColor="teal.800">
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
						<Button >
							Feeds
						</Button>
					</Flex>
				</Container>


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
								<Text fontSize="24px" height="100%" width="100%">
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

