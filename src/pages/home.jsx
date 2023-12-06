import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Flex, HStack, IconButton, Image, ListItem, SkeletonCircle, SkeletonText, TagRightIcon, Text, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ModalStatPlant from "../Components/StatPlant";


const HomepageText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const PlantText = "plant name"
const PlantInfo = "Plant stats"
const arrayInfo = ["Level: 1", "Date: 04/12/2023", "Earnings: 20 ETH"]
const plantImg = "/home2.png"

export default function Home() {
	const { isConnected } = useAccount()
	const { isOpen, onOpen, onClose } = useDisclosure()

	if (isConnected) {

		return (

			<>
				< ModalStatPlant plantImg={plantImg} plantText={PlantText} arrayInfo={arrayInfo} isOpen={isOpen} onClose={onClose} />

				<Image onClick={onOpen} src={plantImg} width={250} height={250} />
			</>
		)

	}
	else return (
		<>
			<Box>
				<Flex justifyContent={"space-around"}>
					<Image src="/home1.png" height="500px" width="auto" />
					<Box>

						<Text fontSize="28px" height="330px" width="660px">{HomepageText}</Text>

					</Box>
				</Flex>
				<Flex justifyContent={"center"} marginTop={"64"}><ConnectButton></ConnectButton></Flex>
			</Box>





		</>
	);
}

