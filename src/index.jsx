//import for React
import React from 'react';
import ReactDOM from 'react-dom/client';
//import for React router
import { BrowserRouter } from 'react-router-dom';
//import for Rainbow Connector
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
//Import for Wagmi (library for communication on ethereum)
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
//Import for Chakra (UI library of react)
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
//Import color theme for chakra
import colors from "./constants/colors";
//Import for component
import App from './App';
import { publicProvider } from 'wagmi/providers/public';


//config chain for wagmi
const { chains, publicClient } = configureChains(
	[mainnet],
	[
		publicProvider()
	]
);
const { connectors } = getDefaultWallets({
	appName: 'Progetto',
	projectId: "fba6cc32b332f823aefbde779eb39050",
	chains
});
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient
})

//config theme for chakra
const theme = extendTheme({ colors })


//Creation app react don't touch without thinking
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider chains={chains}>
						<App />
					</RainbowKitProvider>
				</WagmiConfig>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
