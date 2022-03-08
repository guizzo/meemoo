import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Picture } from '../../models/picture';
import HoverCursor from '../../assets/images/cursor-hover.png';

interface Props {
  pictures: Picture[];
  onCardClick: (index: number) => void;
}

const GameCards: FunctionComponent<Props> = ({ pictures, onCardClick }) => {

  const clickHandler = (picture: Picture, index: number) => () => {
    if (!picture.selected && !picture.correct) {
      onCardClick(index);
    }
  };

  return (
    <Container>
      {
        pictures && pictures.map((picture: Picture, index: number) => (
          <Card
            selected={ picture.selected }
            correct={ picture.correct }
            key={ `card-${ picture.id }-${ index }` }
            onClick={ clickHandler(picture, index) }>
            <CardImage>
              <CardFront/>
              <CardBack
                image={ picture.url }/>
            </CardImage>
          </Card>
        ))
      }
    </Container>
  );

};

export default GameCards;

const Container = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(6, calc(100% / 6));
  align-items: stretch;
  justify-content: stretch;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Card = styled.div<{ selected: boolean, correct: boolean }>`
  flex: 1 1 12%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, .33);
  overflow: hidden;
  background-color: ${ ({ correct }) => correct ? 'lightgreen' : 'white' };
  margin: 20px;
  perspective: 1000px;
  ${ ({ selected }) => !selected ? `cursor: url(${ HoverCursor }), auto;` : null };
  border: 5px solid ${ ({ correct }) => correct ? 'lightgreen' : '#FAE23D' };
  transition: background-color, border-color .2s ease-in-out;
  
  &:hover {
    ${ ({ selected }) => !selected ? 'border-color: lightseagreen;' : null };
  }
  ${
  ({ selected }) => selected
    ? `> div { transform: rotateY(180deg); }`
    :  null
};
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  padding: 20px;
  background-color: #fafafa;
  color: black;
  background-image: url('/card-background.jpeg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

const CardBack = styled.div<{ image: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  background-image: url(${ ({ image }) => image });
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transform: rotateY(180deg);
`;
