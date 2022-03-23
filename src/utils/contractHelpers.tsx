import { ethers } from 'ethers';
import { simpleRpcProvider } from 'utils/providers';

import coinFlipABI from 'config/abi/coinFlip.json';

const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getCoinFlipContract = signer => {
  return getContract(
    coinFlipABI,
    '0xC7149CB613C976f0DcF6CaBca26aA1BCe78C68A9',
    signer,
  );
};
