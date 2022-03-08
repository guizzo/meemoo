import { createReducer } from '@reduxjs/toolkit';
import { FLUSH_PLAYER, GET_RANKINGS, SET_PLAYER } from './thunk';
import { END_GAME, FLIP_CARD, LAUNCH_GAME, SELECT_CARD, START_GAME, TIME_TICK, UPDATE_SCORE } from './actions';
import { Picture } from '../models/picture';
import { Ranking } from '../models/ranking';

export interface GameState {
  playing: boolean;
  player: string;
  score: number;
  time: number;
  started: boolean,
  finished: boolean;
  rankings: Ranking[];
  availablePictures: Picture[];
  selectedPictures: Picture[];
}

const GameInitialState: GameState = {
  playing: false,
  player: '',
  score: 0,
  time: 60,
  started: false,
  finished: false,
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
    let score: number = state.score;
    let selectedPictures: Picture[] = [ ...state.selectedPictures ];
    const clickedPictures: Picture[] = selectedPictures.filter((card: Picture) => card.selected && !card.correct);
    if (clickedPictures.length === 1) {
      const match = clickedPictures[ 0 ].id === selectedPictures[ action.payload ].id;
      if (match) {
        selectedPictures = selectedPictures.map((card: Picture) => {
          if (card.id === selectedPictures[ action.payload ].id) {
            return {
              ...card,
              selected: true,
              correct: true
            };
          }
          return card;
        });
        score = score + 10;
      } else {
        selectedPictures = selectedPictures.map((card: Picture, index) => {
          if (!card.correct) {
            return {
              ...card,
              selected: false
            };
          }
          return card;
        });
      }
    } else {
      selectedPictures = selectedPictures.map((card: Picture, index) => {
        if (index === action.payload) {
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
      score,
      selectedPictures
    };
  },
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
