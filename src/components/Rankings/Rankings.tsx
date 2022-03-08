import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Ranking } from '../../models/ranking';
import WoodBackground from '../../assets/images/wood-background.jpeg';

interface Props {
  scores: Ranking[];
}

const Rankings: FunctionComponent<Props> = ({ scores }) => {

  return (
    <Container>
      {
        scores && scores.map((score: Ranking, index: number) => (
          <Item
            key={ `score-${ index }` }>
            <ItemContainer>
              <Player>{ score.player }</Player>
              <Score>{ score.score }</Score>
            </ItemContainer>
          </Item>
        ))
      }
    </Container>
  );

};

export default Rankings;

const Container = styled.ul`
  width: 100%;
  max-width: 600px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(${ WoodBackground });
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 1.5em;
  font-weight: bold;
  overflow: hidden;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 12px 40px;
  background-color: rgba(255, 255, 255, .15);
`;

const Player = styled.div`
  
`;

const Score = styled.div`
  
`;
