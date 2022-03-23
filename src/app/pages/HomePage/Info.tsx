import * as React from 'react';
import styled from 'styled-components/macro';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const PaddedDiv = styled.div`
  padding: 24px;
`;

export function Info() {
  return (
    <Container>
      <PaddedDiv>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Welcome to Tendie Games! This is an experimental hobby project.
              Neither the TendieSwap devs or me take no responsibility for lost
              funds.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              The contract is deployed to the MATIC MUMBAI network so in order
              to play you have to have a metamask extension and the the MATIC
              testnet configured. If you don't know how to do it, follow the
              steps below
            </Typography>
            <ul>
              <li>
                You can install metamask from{' '}
                <a href="https://metamask.io/">here</a>
              </li>
              <li>
                Add MATIC-MUMBAI testnet to metamask. You find the details{' '}
                <a href="https://docs.matic.network/docs/develop/network-details/network/">
                  here
                </a>
              </li>
              <li>
                Load funds to your account. You need TEST MATIC tokens, so DON'T
                send your mainnet tokens to the test network. You can obtain
                testnet tokens <a href="https://faucet.matic.network/">here</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              The current implementation is <b>alpha</b>, so you will find some
              bugs. Please note that the minimum bet amount is <b>0.01 MATIC</b>{' '}
              and please keep the maximum bet amount below <b>0.1 MATIC</b>{' '}
              because the contract does not have too much funds.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              If the bet is not resolved within a few minute, just refresh the
              page and if you see the Claim button, you won that bet.
            </Typography>
          </Grid>
        </Grid>
      </PaddedDiv>
    </Container>
  );
}

const Container = styled.div``;
