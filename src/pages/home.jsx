import { Box, Button, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ModalImg from "../Components/StatPlant";
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import mockup from '../mockup/mockup'



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
				<Box marginLeft={250} marginRight={250}>
					<Flex my={20} width="100%" backgroundColor={"black"}>
						{
							mockup && mockup.map((element, index) => {
								return (
									<>
									<ModalImg img={element.img} info={element.info} text={element.text} key={index}/>
										
									</>
								)
							})
						}



					</Flex>
					<Button>
						<ChakraLink as={ReactRouterLink} to='/redeem'>
							Redeem
						</ChakraLink>
					</Button>
				</Box>



			</>
		)

	}
	else return (

		<Box marginLeft={250} marginRight={250}>
			<Flex justifyContent={"space-around"}>
				<Image src="/home1.png" height="500px" width="auto" />
				<Box>

					<Text fontSize="28px" height="330px" width="660px">{HomepageText}</Text>

				</Box>
			</Flex>
			<Flex justifyContent={"center"} marginTop={"64"}><ConnectButton></ConnectButton></Flex>
		</Box>






	);
}

