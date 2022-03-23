import { formatEther, parseEther } from '@ethersproject/units';

export const flipCoin = async (contract, choice, amount) => {
  const value = parseEther(amount).toString();

  const tx = await contract.flip(choice, {
    value,
  });
  const receipt = await tx.wait();
  return receipt.status;
};

export const withdrawWinning = async contract => {
  const tx = await contract.withdrawWinning();
  const receipt = await tx.wait();
  return receipt.status;
};

export const isBetWon = async contract => {
  return await contract.isBetWon();
};
