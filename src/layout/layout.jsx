import { Flex, HStack, useMediaQuery } from "@chakra-ui/react";
import { Outlet, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';


export default function Layout() {
	const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
	const { isConnected } = useAccount()

	return (
		<>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				padding={4}
				bgGradient='linear(to-r, #333B6A, #B7FEAE)'
				color="white"
				boxShadow="md"
				direction='row'>
				<HStack spacing={isSmallerThan768 ? 4 : 10}>
					<ChakraLink
						as={ReactRouterLink}
						to="/"
						fontSize={isSmallerThan768 ? 'md' : 'xl'}
						fontWeight="bold"
					>
						Home
					</ChakraLink>

					{isConnected && (
						<>
							<ChakraLink
								as={ReactRouterLink}
								to="/profile"
								fontSize={isSmallerThan768 ? 'md' : 'xl'}
								fontWeight="bold"
							>
								Profile
							</ChakraLink>
							<ChakraLink
								as={ReactRouterLink}
								to="/review"
								fontSize={isSmallerThan768 ? 'md' : 'xl'}
								fontWeight="bold"
							>
								Review
							</ChakraLink>
						</>
					)}

				</HStack>
				<ConnectButton />
			</Flex>
			<Outlet />
		</>
	);
};
