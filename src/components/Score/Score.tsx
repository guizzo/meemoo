import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import CurtainTop from '../../assets/images/curtain-top.png';
import Curtain from '../../assets/images/curtain.png';
import ReactConfetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { RESTART_GAME } from '../../store/actions';
import { useDispatch } from 'react-redux';

interface Props {
  gameIsEnded: boolean;
  player: string;
  score: number;
}

const Score: FunctionComponent<Props> = ({ gameIsEnded, player, score }) => {

  const dispatch = useDispatch();

  const navigator = useNavigate();

  const [ opened, setOpened ] = useState<boolean>(false);
  const [ points, setPoints ] = useState<number>(0);

  const restartGameHandler = (): void => {
    dispatch(RESTART_GAME());
    navigator('/');
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (gameIsEnded) {
      timeout = setTimeout(() => {
        setOpened(true);
      }, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [ gameIsEnded ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameIsEnded && score !== undefined && score !== null) {
      interval = setInterval(() => {
        if (points === score) {
          clearInterval(interval);
        } else {
          setPoints((state) => state + 1);
        }
      }, 2);
    }
    return () => {
      clearInterval(interval);
    };
  }, [ gameIsEnded, score, points ]);

  return (
    <Container
      gameIsEnded={ gameIsEnded }
      onClick={ gameIsEnded && points === score ? restartGameHandler : () => null }>
      <CurtainTopBackground/>
      <CurtainLeft
        opened={ opened }/>
      <CurtainRight
        opened={ opened }/>
      {
        score !== undefined && score > 1000 && (
          <ReactConfetti
            width={ window.innerWidth }
            height={ window.innerHeight }/>
        )
      }
      <Summary>
        <PlayerContainer>
          { player }
        </PlayerContainer>
        <ScoreContainer>
          { points }
        </ScoreContainer>
      </Summary>
    </Container>
  );

};

export default Score;

const Container = styled.div<{ gameIsEnded: boolean }>`
  position: absolute;
  bottom: ${ ({ gameIsEnded }) => gameIsEnded ? '0' : '-100%' };
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: black;
  transition: bottom .2s ease-in-out;
  z-index: 10;
`;

const CurtainTopBackground = styled.div`
  position: absolute;
  background-image: url(${ CurtainTop });
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
`;

const Curtains = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background-image: url(${ Curtain });
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease-in-out;
  z-index: 9;
`;

const CurtainLeft = styled(Curtains)<{ opened: boolean }>`
  left: ${ ({ opened }) => opened ? '-50%' : '0' };
`;

const CurtainRight = styled(Curtains)<{ opened: boolean }>`
  right: ${ ({ opened }) => opened ? '-50%' : '0' };
`;

const Summary = styled.div`
  font-size: 5em;
  text-align: center;
  letter-spacing: 10px;
  color: #ff5900;
  text-shadow: 2px 0 0 #fff,
  -2px 0 0 #fff,
  0 2px 0 #fff,
    0 -2px 0 #fff,
  1px 1px #fff,
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
  -1px 1px 0 #fff;
`;

const PlayerContainer = styled.div`

`;

const ScoreContainer = styled.div`
  
`;
