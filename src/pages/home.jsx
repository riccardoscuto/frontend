import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Flex, HStack, IconButton, Image, ListItem, SkeletonCircle, SkeletonText, TagRightIcon, Text, UnorderedList } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const testoPrimaPagina = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const testoPianta = "plant name"
const testoCaratteristiche = "Plant stats"
const arrayInfo = ["Level: 1", "Date: 04/12/2023", "Earnings: 20 ETH"]
export default function Home() {
	const { isConnected } = useAccount()

	if (isConnected) {
		return (
			<>
				<Box>
					<Flex justifyContent={"center"}>
						<IconButton
							colorScheme='teal'
							aria-label='Call Segun'
							size='lg'
							icon={<ArrowLeftIcon />}
							onClick={() => { console.log("Change plant") }}
						/>
						<Text fontSize="22px" >{testoPianta}	</Text>
						<IconButton
							colorScheme='teal'
							aria-label='Call Segun'
							size='lg'
							icon={<ArrowRightIcon />}
							onClick={() => { console.log("Change plant") }}
						/>
					</Flex>
					<Flex justifyContent={"space-around"}>
						<Image src="/home2.png" width="auto" height="400px" />
						<Box>
							<UnorderedList fontSize={32} marginTop={26}>
								{
									arrayInfo && arrayInfo.map((element, index, array) => {
										return (
											<ListItem key={index}>{element}</ListItem>
										)

									})
								}

							</UnorderedList>


						</Box>
					</Flex>
				</Box>



			</>
		)

	}
	else return (
		<>
			<Box>
				<Flex justifyContent={"space-around"}>
					<Image src="/home1.png" height="500px" width="auto" />
					<Box>

						<Text fontSize="28px" height="330px" width="660px">{testoPrimaPagina}</Text>

					</Box>
				</Flex>
				<Flex justifyContent={"center"} marginTop={"64"}><ConnectButton></ConnectButton></Flex>
			</Box>





		</>
	);
}

