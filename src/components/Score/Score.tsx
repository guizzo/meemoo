import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
  gameIsEnded: boolean;
  player: string;
  score: number;
}

const Score: FunctionComponent<Props> = ({ gameIsEnded, player, score }) => {

  return (
    <Container
      gameIsEnded={ gameIsEnded }>
      <Summary>
        <PlayerContainer>
          { player }
        </PlayerContainer>
        <ScoreContainer>
          { score }
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
  //background-image: url();
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: bottom .2s ease-in-out;
`;

const Summary = styled.div`
  text-shadow:  2px 0 0 #fff, 
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
