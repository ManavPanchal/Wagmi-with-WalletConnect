'use client';
import WalletProvider from '../context/WalletProvider';
import { WagmiConnection } from '../components/WagmiConnection';

export default function Home() {
  return (
    <WalletProvider>
      <WagmiConnection />
    </WalletProvider>
  );
}
