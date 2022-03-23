import { useCallback } from 'react';
import { isBetWon } from 'utils/calls';
import { useCoinFlip } from 'hooks/useContract';

const useIsBetWon = () => {
  const coinFlipContract = useCoinFlip();

  const handleBetWon = useCallback(async () => {
    return await isBetWon(coinFlipContract);
  }, [coinFlipContract]);

  return { onBetWon: handleBetWon };
};

export default useIsBetWon;
