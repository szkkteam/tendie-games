import React, { useEffect, useState, useMemo } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import NumericInput from 'app/components/NumericInput';
import PercentageSlider from './components/PercentageSlider';
import Coin from './components/Coin';

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';
import { formatEther, parseEther } from '@ethersproject/units';

import { useCoinFlip } from 'hooks/useContract';

import useFlipCoin from './hooks/useFlipCoin';
import useWithdrawWinning from './hooks/useWithdrawWinning';
import useIsBetWon from './hooks/useIsBetWon';
import { Typography } from '@material-ui/core';

const enum BetResult {
  BET_WON = 'WON',
  BET_LOST = 'LOST',
  NO_BET = 'NO_BET',
}

function FlipButton({
  error,
  inProgress,
  //onClick,
  ...props
}) {
  return (
    <Button
      disabled={inProgress || error}
      fullWidth
      color="primary"
      variant="contained"
      {...props}
    >
      {error ? 'Error: Invalid network' : inProgress ? 'In progres...' : 'Play'}
    </Button>
  );
}

function ClaimButton({
  error,
  inProgress,
  //onClick,
  ...props
}) {
  return (
    <Button
      disabled={inProgress || error}
      fullWidth
      color="primary"
      variant="contained"
      {...props}
    >
      {error
        ? 'Error: Invalid network'
        : inProgress
        ? 'In progres...'
        : 'Claim'}
    </Button>
  );
}

export function CoinFlipGame() {
  const { account, library, chainId } = useWeb3React();

  const [marks, setMarks] = useState<any>([]);
  const [inProgress, setInProgress] = useState(false);
  const [waitForResult, setWaitForResult] = useState(false);
  const [betProcessed, setBetProcessed] = useState(true);
  const [bet, setBet] = useState<any>('');
  const [choice, setChoice] = useState('1');
  const [result, setResult] = React.useState<string>('');

  const coinFlipContract = useCoinFlip();

  const { onFlip } = useFlipCoin();
  const { onWithdraw } = useWithdrawWinning();
  const { onBetWon } = useIsBetWon();

  const setMaxBalance = () => {
    library
      .getBalance(account)
      .then((balance: any) => {
        setBet(formatEther(balance));
      })
      .catch(() => {
        //setBalance(null);
      });
  };

  const handleChange = e => {
    console.log('Set choice to: ', e.target.value);
    setChoice(e.target.value);
  };

  const handleSlideChange = (e, v) => {
    setBet(v.toString());
  };

  const handleBetChange = v => {
    setBet(v);
  };

  useEffect(() => {
    /*
    coinFlipContract.on('CoinFlipped', (requestId, address, bet) => {
      console.log(`From ${address} bet placed ${bet} with ID: ${requestId}`);
    });
    */
    const filter = coinFlipContract.filters.CoinLanded(
      null,
      account,
      null,
      null,
    );
    //coinFlipContract.on('CoinLanded', (requestId, address, result) => {
    coinFlipContract.on(filter, (requestId, address, won) => {
      console.log(`From ${address} bet result ${won} with ID: ${requestId}`);

      (async () => {
        const betWon = await onBetWon();
        // Because final result is not emitted, we have to calculate it from the choice and betWon variable
        const result = betWon ? choice : choice === '1' ? '2' : '1';
        console.log('Result: ', result);
        console.log('choice: ', choice);
        console.log("choice === '1'", choice === '1');
        console.log('Won? ', betWon);
        setResult(betWon ? choice : choice === '1' ? '2' : '1');
        setBetProcessed(!betWon);
      })();
      setInProgress(false);
      setWaitForResult(false);
    });

    return () => {
      coinFlipContract.removeAllListeners();
    };
  }, [coinFlipContract]);

  useEffect(() => {
    (async () => {
      let totalBalance;

      // TODO: Read dynamic max bet and use the smaller balance < dynamicBet? balance : dynamicBet
      if (library) {
        try {
          totalBalance = parseFloat(
            formatEther(await library.getBalance(account)),
          );
        } catch (e) {}
      }

      setMarks(
        totalBalance
          ? [
              { value: totalBalance / 4, label: '25%' },
              { value: totalBalance / 2, label: '50%' },
              { value: (totalBalance * 3) / 4, label: '75%' },
              { value: (totalBalance * 2) / 2.001, label: '100%' },
            ]
          : [],
      );
    })();
  }, [inProgress, library]);

  const placeBet = async () => {
    setInProgress(true);
    try {
      await onFlip(choice, bet);
      setWaitForResult(true);
    } catch (e) {
      setInProgress(false);
    }
  };

  const claimBet = async () => {
    setInProgress(true);
    try {
      await onWithdraw();
      setBetProcessed(true);
    } catch (e) {}

    setInProgress(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const betWon = await onBetWon();
        setBetProcessed(!betWon);
      } catch (e) {}
    })();
  }, [coinFlipContract]);

  return (
    <Card>
      <CardHeader
        title="CoinFlip"
        subheader="Head or tail? Place your bet and win!"
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormControl component="fieldset" disabled={inProgress}>
              <FormLabel component="legend">Bet choice</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={choice}
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Head" />
                <FormControlLabel value="2" control={<Radio />} label="Tail" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <Coin isProgress={waitForResult} result={result} />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              {marks && (
                <PercentageSlider
                  onChange={handleSlideChange}
                  min={0.01}
                  max={marks?.length > 1 ? marks[3].value : 0.02}
                  marks={marks}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <NumericInput
                value={bet}
                onChange={handleBetChange}
                label="Bet amount"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {betProcessed ? (
              <FlipButton
                error={!!!account}
                inProgress={inProgress}
                onClick={placeBet}
              />
            ) : (
              <ClaimButton
                error={!!!account}
                inProgress={inProgress}
                onClick={claimBet}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
