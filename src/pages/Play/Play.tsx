import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Background from '../../assets/images/background.jpeg';
import useGame from '../../hooks/useGame';
import GameStatus from '../../components/GameStatus/GameStatus';
import GameCards from '../../components/GameCards/GameCards';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { END_GAME, FLIP_CARD, START_GAME, TIME_TICK } from '../../store/actions';
import { Picture } from '../../models/picture';

/**
 * ***** ANIMAZIONE CARTE CHE SI GIRANO AL CLICK ******
 * 1. creare action ADD_TO_SELECTED_POOL
 * 2. al click della carta, dispatchare ADD_TO_SELECTED_POOL
 * 3. creare selector getSelectedPool
 * 4. useEffect su selectedCardPool
 * 5. se selectedCardPool.length === 2 allora effettuare il controllo, se negativo girarle entrambe, se positivo flaggarle entrambe
 *
 * ***** GESTIONE CLASSIFICA GIOCATORI ******
 * 1. usare action ADD_SCORE
 * 2. al completamento della partita OR allo scadere del timer dispatchare la fine del gioco e settare lo score tramite un thunk
 * 3. nel reducer, a score settato, ripristinare lo stato iniziare dello store e forzare il redirect alla welcomePage
 *
 * ***** ENHANCEMENTS ******
 * 1. Barra di stato del gioco con font più visibili e/o colorati
 * 2. Riproduzione di suoni WOW, COOL e POOR a fine partita in base al punteggio
 */

const Play: FunctionComponent = () => {

  const dispatch = useDispatch();

  const navigator = useNavigate();

  const { isPlaying, pictures, player, score, time, selectCardHandler } = useGame();

  const [ countdown, setCountdown ] = useState<string[]>([]);

  // INFO: redirect to welcome page on refresh
  useEffect(() => {
    if (!pictures || !pictures.length) {
      navigator('/');
    }
  }, [ isPlaying, pictures, navigator ]);

  // INFO: starting animation for show extracted cards
  useEffect(() => {
    let timeout: any;
    pictures.forEach((picture: Picture, index: number) => {
      if (!picture.selected) {
        timeout = setTimeout(() => {
          dispatch(FLIP_CARD(index));
        }, 125 * (index + 1));
      }
    });
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // INFO: Set vocal countdown when all cards are showed
  useEffect(() => {
    const allCardsFlipped = pictures.filter((picture: Picture) => !picture.selected).length === 0;
    if (!isPlaying && allCardsFlipped) {
      setCountdown([ 'Cinque', 'Quattro', 'Tre', 'Due', 'Uno', 'Gioca!' ]);
    }
  }, [ isPlaying, pictures ]);

  // INFO: Decremental vocal countdown execution
  useEffect(() => {
    let timeout: any;
    if (!isPlaying) {
      if (countdown && countdown.length > 0) {
        timeout = setTimeout(() => {
          const text = countdown[ 0 ];
          setCountdown((state) => [ ...state ].filter((count: string) => count !== text));
          let msg = new SpeechSynthesisUtterance();
          msg.text = text;
          msg.rate = 8;
          msg.lang = 'it';
          msg.pitch = 2;
          window.speechSynthesis.speak(msg);
          if (countdown.length > 0 && countdown.length === 1) {
            dispatch(START_GAME());
          }
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [ isPlaying, countdown ])

  // INFO: start game countdown
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      if (time > 0) {
        interval = setInterval(() => {
          dispatch(TIME_TICK());
        }, 1000);
      }
      if (time <= 0) {
        clearInterval(interval);
        dispatch(END_GAME());
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [ isPlaying, time, dispatch ]);

  return (
    <Container>
      <GameStatus
        player={ player }
        time={ time }
        score={ score }/>
      <GameCards
        pictures={ pictures }
        onCardClick={ selectCardHandler }/>
    </Container>
  );

};

export default Play;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${ Background });
`;
