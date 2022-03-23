import { useCallback } from 'react';
import { flipCoin } from 'utils/calls';
import { useCoinFlip } from 'hooks/useContract';

const useFlipCoin = () => {
  const coinFlipContract = useCoinFlip();

  const handleFlipCoin = useCallback(
    async (choice, amount) => {
      const txHash = await flipCoin(coinFlipContract, choice, amount);
      console.info(txHash);
    },
    [coinFlipContract],
  );

  return { onFlip: handleFlipCoin };
};

export default useFlipCoin;
