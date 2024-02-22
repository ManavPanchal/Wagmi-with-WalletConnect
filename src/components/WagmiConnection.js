import { useState } from 'react';
import { useAccount, useConnect, useSignTypedData } from 'wagmi';
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

  const { isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const signer = useSigner();
  const { signTypedDataAsync } = useSignTypedData(messageToBeSigned);

  const handleConnect = async () => {
    if (!isConnected) await connectAsync({ connector: connectors[0] });
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
        primaryType: 'PrimaryType',
        message: messageToBeSigned.value,
      });
    setSignature(signature);
  };

  return (
    <div className="flex gap-2 flex-col justify-center items-center mt-8">
      <button
        onClick={handleConnect}
        className="rounded-md bg-slate-500 px-5 py-2"
      >
        Connect
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
