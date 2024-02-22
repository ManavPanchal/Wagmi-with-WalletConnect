import { useState, useEffect } from 'react';
import { useNetwork, useWalletClient } from 'wagmi';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

export function walletClientToSigner(walletClient, connectedNetwork) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain?.id || connectedNetwork?.id,
    name: chain?.name || connectedNetwork?.name,
    ensAddress:
      chain?.contracts?.ensRegistry?.address ||
      connectedNetwork?.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account?.address);
  return signer;
}

export function useSigner(chainId) {
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient({
    chainId: chainId || chain?.id,
  });
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (walletClient) setSigner(walletClientToSigner(walletClient, chain));
  }, [walletClient]);

  return signer;
}
