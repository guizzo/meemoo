import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/background.jpeg';
import useGame from '../../hooks/useGame';
import Rankings from '../../components/Rankings/Rankings';
import { useDispatch } from 'react-redux';
import { GET_RANKINGS } from '../../store/thunk';
import PlayButton from '../../assets/images/play-button.png';
import HoverCursor from '../../assets/images/cursor-hover.png';

const WelcomeScreen: FunctionComponent = () => {

  const dispatch = useDispatch();

  const { player, rankings, playerChangeHandler, launchGameHandler } = useGame();

  // INFO: retrieve rankings
  useEffect(() => {
    dispatch(GET_RANKINGS());
  }, [ dispatch ]);

  return (
    <Container>
      <InnerContainer>
        <Wrapper
          size={ 800 }>
          <Title>
            <BitTitle>MeeMoo</BitTitle>
            <h2>Alleniamo la memoria divertendoci</h2>
          </Title>
          <NewGame>
            <Input
              type="text"
              value={ player }
              onChange={ playerChangeHandler }/>
            <Button
              disabled={ !player || player.length <= 0 }
              onClick={ launchGameHandler }>Gioca!</Button>
          </NewGame>
          <Rankings
            scores={ rankings }/>
        </Wrapper>
      </InnerContainer>
    </Container>
  );

};

export default WelcomeScreen;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${ Background });
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(255, 255, 255, .2);
  overflow: auto;
`;

const Wrapper = styled.div<{ size: number }>`
  width: 100%;
  max-width: ${ ({ size }) => size }px;
`;

const Title = styled.div`
  color: #eb9542;
  font-size: 1.6em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
`;

const BitTitle = styled.h1`
  color: #eb9542;
  font-size: 6em;
`;

const NewGame = styled.div`
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  -webkit-appearance: none;
  border: none;
  border-radius: 10px;
  padding: 12px 25px;
  margin-right: 30px;
  font-size: 1.2em;
  font-family: 'Indie Flower', cursive;
`;

const Button = styled.button`
  -webkit-appearance: none;
  padding: 12px 25px;
  border: none;
  width: 140px;
  height: 60px;
  border-radius: 10px;
  font-size: 1.2em;
  color: transparent;
  background-image: url(${ PlayButton });
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 170px;
  cursor: url(${ HoverCursor }), auto;
  
  &:disabled {
    cursor: not-allowed;
    opacity: .6;
  }
`;
