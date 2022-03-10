import { FunctionComponent } from 'react';
import styled from 'styled-components';
import WoodBackground from '../../assets/images/wood-background.jpeg';

interface Props {
  player: string;
  time: number;
  score: number;
}

const GameStatus: FunctionComponent<Props> = ({ player, time, score }) => {

  return (
    <Container>
      <PlayerName>
        Sta giocando: <strong>{ player }</strong>
      </PlayerName>
      <PlayerTime>
        { time }
      </PlayerTime>
      <PlayerScore>
        { score } punti
      </PlayerScore>
    </Container>
  );

};

export default GameStatus;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 1.5em;
  background-image: url(${ WoodBackground });
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  box-shadow: 0 0 12px rgb(0 0 0 / 83%);
  text-shadow:  2px 0 0 #fff, 
                -2px 0 0 #fff,
                0 2px 0 #fff, 
                0 -2px 0 #fff,
                1px 1px #fff,
                -1px -1px 0 #fff,
                1px -1px 0 #fff,
                -1px 1px 0 #fff;
`;

const PlayerName = styled.div`
  min-width: 200px;
  text-align: left;
`;

const PlayerTime = styled.div`
  font-size: 1.2em;
  min-width: 200px;
  text-align: center;
`;

const PlayerScore = styled.div`
  min-width: 200px;
  text-align: right;
`;
