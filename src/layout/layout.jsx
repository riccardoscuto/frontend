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
				backgroundColor="teal.700"
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
						to="/about"
						fontSize="xl"
						fontWeight="bold"				>
						About
					</ChakraLink>
				</HStack>
				<ConnectButton />
			</Flex>
			<Outlet />
		</>
	);
}
