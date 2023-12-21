import { Flex, HStack } from "@chakra-ui/react";
import { Outlet, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';


export default function Layout() {
	return (
		<>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				padding={4}
				bgGradient='linear(to-l, #333B6A,  #B7FEAE)'
				color="white"
				boxShadow="md"
			>
				<HStack spacing={10}>
					<ChakraLink
						as={ReactRouterLink}
						to="/"
						fontSize="xl"
						fontWeight="bold"
					>
						Home
					</ChakraLink>
					<ChakraLink
						as={ReactRouterLink}
						to="/profile"
						fontSize="xl"
						fontWeight="bold"				>
						Profile
					</ChakraLink>
					<ChakraLink
						as={ReactRouterLink}
						to="/review"
						fontSize="xl"
						fontWeight="bold"	>
						Review
					</ChakraLink>
				</HStack>
				<ConnectButton />
			</Flex>
			<Outlet />
		</>
	);
}
