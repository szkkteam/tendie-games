import React from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import Typography from '@material-ui/core/Typography';

type CoinInterface = {
  result: string;
  inProgress: boolean;
};

const inProgressFlip = keyframes`
from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
`;

const flipHeads = keyframes`
from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
`;

const flipTails = keyframes`
from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(390deg);
    -moz-transform: rotateY(390deg);
    transform: rotateY(390deg);
  }
`;

const CoinContainer = styled.div<CoinInterface>`
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 100px;

  transition: -webkit-transform 1s ease-in;
  -webkit-transform-style: preserve-3d;

  & div {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
      0 12px 20px -10px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
      0 12px 20px -10px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
      0 12px 20px -10px rgba(0, 0, 0, 0.4);

    position: absolute;
    -webkit-backface-visibility: hidden;
  }
  ${({ result, inProgress }) =>
    inProgress
      ? css`
          animation: ${inProgressFlip} 1.2s linear infinite;
        `
      : result === '1'
      ? css`
          animation: ${flipHeads} 0.6s ease-out forwards;
        `
      : result === '2'
      ? css`
          //animation: ${flipTails} 0.6s ease-out forwards;
        `
      : css`
          // Idle
        `}
`;

const CoinHead = styled.div`
  background-image: url('https://www.tendieswap.org/static/media/logo.4fc13904.png');
  background-size: 102px 102px;
  //background-color: #3e3e3e;
  color: white;
  text-align: center;
  -webkit-transform: rotateY(-180deg);
`;

const CoinTail = styled.div`
  z-index: 100;
  background-color: #bb0000;
  color: white;
  text-align: center;
`;

function Coin({ isProgress, result, ...props }) {
  return (
    <CoinContainer
      id="coin"
      inProgress={isProgress}
      result={result}
      key={+new Date()}
    >
      <CoinHead />
      <CoinTail>
        <Typography variant="body2">TAIL</Typography>
      </CoinTail>
    </CoinContainer>
  );
}

export default React.memo(Coin);
