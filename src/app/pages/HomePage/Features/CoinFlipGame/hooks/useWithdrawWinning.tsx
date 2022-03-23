import { useCallback } from 'react';
import { withdrawWinning } from 'utils/calls';
import { useCoinFlip } from 'hooks/useContract';

const useWithdrawWinning = () => {
  const coinFlipContract = useCoinFlip();

  const handleWithdrawWinning = useCallback(async () => {
    const txHash = await withdrawWinning(coinFlipContract);
    console.info(txHash);
  }, [coinFlipContract]);

  return { onWithdraw: handleWithdrawWinning };
};

export default useWithdrawWinning;
