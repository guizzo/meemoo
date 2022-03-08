import { useDispatch, useSelector } from 'react-redux';
import { getIsFinished, getIsPlaying, getIsStarted, getPlayer, getRankings, getScore, getSelectedPictures, getTime } from '../store/selectors';
import { Ranking } from '../models/ranking';
import { ChangeEvent } from 'react';
import { SET_PLAYER } from '../store/thunk';
import { LAUNCH_GAME, SELECT_CARD } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import { Picture } from '../models/picture';

interface HookProps {
  isPlaying: boolean;
  isStarted: boolean;
  isFinished: boolean;
  player: string;
  score: number;
  time: number;
  rankings: Ranking[];
  pictures: Picture[];
  playerChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  launchGameHandler: () => void;
  selectCardHandler: (index: number) => void;
}

const useGame = (): HookProps => {

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const isPlaying: boolean = useSelector(getIsPlaying);
  const isStarted: boolean = useSelector(getIsStarted);
  const isFinished: boolean = useSelector(getIsFinished);
  const player: string = useSelector(getPlayer);
  const score: number = useSelector(getScore);
  const time: number = useSelector(getTime);
  const rankings: Ranking[] = useSelector(getRankings);
  const pictures: Picture[] = useSelector(getSelectedPictures);

  const playerChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(SET_PLAYER({ player: e.target.value.toUpperCase() }));
  const launchGameHandler = () => {
    dispatch(LAUNCH_GAME());
    navigator('/play');
  };
  const selectCardHandler = (index: number) => dispatch(SELECT_CARD(index));

  return {
    isPlaying,
    isStarted,
    isFinished,
    player,
    score,
    time,
    rankings,
    pictures,
    playerChangeHandler,
    launchGameHandler,
    selectCardHandler
  };

};

export default useGame;
