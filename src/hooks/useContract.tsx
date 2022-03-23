import { useMemo } from 'react';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import { getCoinFlipContract } from 'utils/contractHelpers';

export const useCoinFlip = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getCoinFlipContract(library?.getSigner()), [library]);
};
