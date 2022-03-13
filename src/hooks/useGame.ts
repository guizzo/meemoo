import { useDispatch, useSelector } from 'react-redux';
import {
  getClickedCards,
  getIsFinished,
  getIsPlaying, getIsScoreStored,
  getIsStarted,
  getIsTouched,
  getPlayer,
  getRankings,
  getScore,
  getSelectedPictures,
  getTime
} from '../store/selectors';
import { Ranking } from '../models/ranking';
import { ChangeEvent } from 'react';
import { SET_PLAYER, SET_RANKING } from '../store/thunk';
import { LAUNCH_GAME, SELECT_CARD } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { Picture } from '../models/picture';

interface HookProps {
  isPlaying: boolean;
  isStarted: boolean;
  isFinished: boolean;
  isTouched: boolean;
  isScoreStored: boolean;
  player: string;
  score: number;
  time: number;
  rankings: Ranking[];
  pictures: Picture[];
  clickedCards: Picture[];
  playerChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  launchGameHandler: () => void;
  selectCardHandler: (index: number) => void;
  setScore: () => void;
}

const useGame = (): HookProps => {

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const isPlaying: boolean = useSelector(getIsPlaying);
  const isStarted: boolean = useSelector(getIsStarted);
  const isFinished: boolean = useSelector(getIsFinished);
  const isTouched: boolean = useSelector(getIsTouched);
  const isScoreStored: boolean = useSelector(getIsScoreStored);
  const player: string = useSelector(getPlayer);
  const score: number = useSelector(getScore);
  const time: number = useSelector(getTime);
  const rankings: Ranking[] = useSelector(getRankings);
  const pictures: Picture[] = useSelector(getSelectedPictures);
  const clickedCards: Picture[] = useSelector(getClickedCards);

  const playerChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(SET_PLAYER({ player: e.target.value.toUpperCase() }));
  const launchGameHandler = () => {
    dispatch(LAUNCH_GAME());
    navigator('/play');
  };
  const selectCardHandler = (index: number) => {
    if (clickedCards.length < 2) {
      dispatch(SELECT_CARD(index));
    }
  };
  const setScore = () => dispatch(SET_RANKING({ player, score, time }));

  return {
    isPlaying,
    isStarted,
    isFinished,
    isTouched,
    isScoreStored,
    player,
    score,
    time,
    rankings,
    pictures,
    clickedCards,
    playerChangeHandler,
    launchGameHandler,
    selectCardHandler,
    setScore
  };

};

export default useGame;
