import React from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { mainnet, optimism } from 'wagmi/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism],
  [publicProvider()],
);

export const config = createConfig({
  autoConnect: true,
  chains,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const WalletProvider = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
