import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignTypedData } from 'wagmi';
import { useSigner } from '../context/ethers';

const messageToBeSigned = {
  domain: {
    name: 'domain-name',
    version: '1',
    chainId: 1,
  },
  types: {
    PrimaryType: [{ name: 'variableName', type: 'uint8' }],
  },
  value: {
    variableName: 1,
  },
};

export const WagmiConnection = () => {
  const [signature, setSignature] = useState('');

  const { isConnected, chainId } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const signer = useSigner(chainId);
  const { signTypedDataAsync } = useSignTypedData();

  const handleConnection = async () => {
    if (isConnected) await disconnectAsync({ connector: connectors[0] });
    else await connectAsync({ connector: connectors[0] });
  };

  const handleSign = async ({ withEthersAdapterSigner = false }) => {
    let signature;

    if (withEthersAdapterSigner)
      signature = await signer.signTypedData(
        messageToBeSigned.domain,
        messageToBeSigned.types,
        messageToBeSigned.value,
      );
    else
      signature = await signTypedDataAsync({
        types: messageToBeSigned.types,
        domain: messageToBeSigned.domain,
        primaryType: 'PrimaryType',
        message: messageToBeSigned.value,
      });
    setSignature(signature);
  };

  return (
    <div className="flex gap-2 flex-col justify-center items-center mt-8">
      <button
        onClick={handleConnection}
        className="rounded-md bg-slate-500 px-5 py-2"
      >
        Connect / Disconnect
      </button>
      {isConnected && (
        <>
          <button
            onClick={handleSign}
            className="rounded-md bg-slate-500 px-5 py-2"
          >
            SignTypedData
          </button>
          <button
            onClick={() => handleSign({ withEthersAdapterSigner: true })}
            className="rounded-md bg-slate-500 px-5 py-2"
          >
            SignTypedData - with Ethers adapter
          </button>
        </>
      )}
      {signature && <p>signature: {signature}</p>}
    </div>
  );
};
