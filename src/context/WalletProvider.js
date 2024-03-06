import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { mainnet, optimism } from 'wagmi/chains';

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet, optimism],
  connectors: [
    new walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    }),
  ],
});

const WalletProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletProvider;
