import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import styled from 'styled-components/macro';
import Container from '@material-ui/core/Container';
import { Info } from './Info';
import Grid from '@material-ui/core/Grid';
import { CoinFlipGame } from './Features/CoinFlipGame';

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import useEagerConnect from 'hooks/useEagerConnect';
import useInactiveListener from 'hooks/useInactiveListener';

import { injected, walletconnect } from 'config/connectors';

enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

const ContainerDiv = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 16px;
`;

export function HomePage() {
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const currentConnector = connectorsByName[ConnectorNames.Injected];
  const activating = currentConnector === activatingConnector;
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar
        activating={activating}
        connected={connected}
        disabled={disabled}
        account={account}
        setActivatingConnector={() => {
          setActivatingConnector(currentConnector);
          activate(injected);
        }}
      />
      <Container maxWidth="lg">
        <Info />
        <ContainerDiv>
          <CoinFlipGame />
        </ContainerDiv>
      </Container>
    </>
  );
}
