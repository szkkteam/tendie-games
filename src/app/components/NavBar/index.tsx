import * as React from 'react';
import styled from 'styled-components/macro';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';

export function NavBar({
  setActivatingConnector,
  account,
  activating,
  connected,
  disabled,
  ...props
}) {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <GrowTitle variant="h6">Tendie Games</GrowTitle>
          <Button
            variant="contained"
            disabled={disabled}
            onClick={setActivatingConnector}
          >
            {activating && <CircularProgress />}
            {connected ? (
              <span>
                {account
                  ? `${account.substring(0, 6)}...${account.substring(
                      account.length - 4,
                    )}`
                  : 'Invalid'}
              </span>
            ) : (
              <span>Connect Wallett</span>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

const GrowTitle = styled(Typography)`
  flex-grow: 1;
`;

const Container = styled.div`
  flex-grow: 1;
`;
