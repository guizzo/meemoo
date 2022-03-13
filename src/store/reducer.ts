import { createReducer } from '@reduxjs/toolkit';
import { FLUSH_PLAYER, GET_RANKINGS, SET_PLAYER, SET_RANKING } from './thunk';
import { END_GAME, FLIP_CARD, LAUNCH_GAME, SELECT_CARD, SET_PAIR_CORRECT, SET_PAIR_WRONG, START_GAME, TIME_TICK, UPDATE_SCORE } from './actions';
import { Picture } from '../models/picture';
import { Ranking } from '../models/ranking';

export interface GameState {
  playing: boolean;
  player: string;
  score: number;
  time: number;
  started: boolean,
  finished: boolean;
  touched: boolean;
  stored: boolean;
  rankings: Ranking[];
  availablePictures: Picture[];
  selectedPictures: Picture[];
  clicked: Picture[];
}

const GameInitialState: GameState = {
  playing: false,
  player: '',
  score: 0,
  time: 60,
  started: false,
  finished: false,
  touched: false,
  stored: false,
  rankings: [],
  availablePictures: [
    { id: 'baby',         url: '/cartoon/baby.png',         selected: false, correct: false },
    { id: 'baby-boss',    url: '/cartoon/baby-boss.png',    selected: false, correct: false },
    { id: 'dexter',       url: '/cartoon/dexter.png',       selected: false, correct: false },
    { id: 'dwarf',        url: '/cartoon/dwarf.png',        selected: false, correct: false },
    { id: 'garfield',     url: '/cartoon/garfield.png',     selected: false, correct: false },
    { id: 'hello-kitty',  url: '/cartoon/hello-kitty.png',  selected: false, correct: false },
    { id: 'jerry',        url: '/cartoon/jerry.png',        selected: false, correct: false },
    { id: 'lisa',         url: '/cartoon/lisa.png',         selected: false, correct: false },
    { id: 'mickey',       url: '/cartoon/mickey.png',       selected: false, correct: false },
    { id: 'minion',       url: '/cartoon/minion.png',       selected: false, correct: false },
    { id: 'monster',      url: '/cartoon/monster.png',      selected: false, correct: false },
    { id: 'nemo',         url: '/cartoon/nemo.png',         selected: false, correct: false },
    { id: 'panda',        url: '/cartoon/panda.png',        selected: false, correct: false },
    { id: 'paw',          url: '/cartoon/paw.png',          selected: false, correct: false },
    { id: 'pikachu',      url: '/cartoon/pikachu.png',      selected: false, correct: false },
    { id: 'rapunzel',     url: '/cartoon/rapunzel.png',     selected: false, correct: false },
    { id: 'smurf',        url: '/cartoon/smurf.png',        selected: false, correct: false },
    { id: 'spiderman',    url: '/cartoon/spiderman.png',    selected: false, correct: false },
    { id: 'spongebob',    url: '/cartoon/spongebob.png',    selected: false, correct: false },
    { id: 'unicorn',      url: '/cartoon/unicorn.png',      selected: false, correct: false }
  ],
  selectedPictures: [],
  clicked: []
};

const gameReducer = createReducer<GameState>(GameInitialState, {
  [ SET_PLAYER.fulfilled.type ]: (state, action) => ({
    ...state,
    player: action.payload
  }),
  [ FLUSH_PLAYER.fulfilled.type ]: (state, action) => ({
    ...state,
    player: ''
  }),
  [ GET_RANKINGS.fulfilled.type ]: (state, action) => ({
    ...state,
    rankings: action.payload
  }),
  [ SET_RANKING.fulfilled.type ]: (state, action) => ({
    ...state,
    stored: true
  }),
  [ LAUNCH_GAME.type ]: (state, action) => {
    const pictures = [ ...state.availablePictures ].sort(() => 0.5 - Math.random()).slice(0, 9);
    const selectedPictures = [ ...pictures, ...pictures ].sort(() => 0.5 - Math.random());
    return {
      ...state,
      selectedPictures
    };
  },
  [ START_GAME.type ]: (state, action) => ({
    ...state,
    playing: true,
    selectedPictures: state.selectedPictures.map((card: Picture, index: number) => ({ ...card, selected: false }))
  }),
  [ END_GAME.type ]: (state, action) => ({
    ...state,
    finished: true
  }),
  [ SELECT_CARD.type ]: (state, action) => {
    let clicked: Picture[] = [ ...state.clicked ];
    let selectedPictures: Picture[] = [ ...state.selectedPictures ];
    let card = { ...state.selectedPictures[ action.payload ] };
    if (card) {
      clicked = [ ...clicked, { ...card, index: action.payload } ];
      selectedPictures = selectedPictures.map((card: Picture, index: number) => {
        const exist = clicked.find((el: Picture) => el.index === index);
        if (exist) {
          return {
            ...card,
            selected: true
          };
        }
        return card;
      });
    }
    return {
      ...state,
      selectedPictures,
      touched: true,
      clicked
    };
  },
  [ SET_PAIR_CORRECT.type ]: (state, action) => {
    const selectedPictures = state.selectedPictures.map((picture: Picture, index: number) => {
      const exist = state.clicked.find((el: Picture) => index === el.index);
      if (exist) {
        return {
          ...picture,
          correct: true
        };
      }
      return {
        ...picture
      };
    });
    const counts: number = selectedPictures.filter((card: Picture) => card.correct).length;
    const score: number = counts * 25;
    return {
      ...state,
      score,
      selectedPictures,
      clicked: []
    };
  },
  [ SET_PAIR_WRONG.type ]: (state, action) => ({
    ...state,
    selectedPictures: state.selectedPictures.map((picture: Picture) => {
      if (picture.selected && !picture.correct) {
        return {
          ...picture,
          selected: false
        };
      }
      return {
        ...picture
      };
    }),
    clicked: []
  }),
  [ TIME_TICK.type ]: (state, action) => ({
    ...state,
    time: state.time - 1
  }),
  [ UPDATE_SCORE.type ]: (state, action) => ({
    ...state,
    score: action.payload
  }),
  [ FLIP_CARD.type ]: (state, action) => ({
    ...state,
    selectedPictures: state.selectedPictures.map((card: Picture, index: number) => {
      if (index === action.payload) {
        return {
          ...card,
          selected: !card.selected
        };
      }
      return card;
    })
  })
});

export default gameReducer;
