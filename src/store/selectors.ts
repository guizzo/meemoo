import { ReduxState } from './store';
import { GameState } from './reducer';
const { createSelector } = require("@reduxjs/toolkit");

const GameStore = (state: ReduxState) => state.game;

export const getIsPlaying = createSelector(GameStore, (state: GameState) => state.playing);
export const getIsStarted = createSelector(GameStore, (state: GameState) => state.started);
export const getIsFinished = createSelector(GameStore, (state: GameState) => state.finished);
export const getPlayer = createSelector(GameStore, (state: GameState) => state.player);
export const getScore = createSelector(GameStore, (state: GameState) => state.score);
export const getTime = createSelector(GameStore, (state: GameState) => state.time);
export const getRankings = createSelector(GameStore, (state: GameState) => state.rankings);
export const getSelectedPictures = createSelector(GameStore, (state: GameState) => state.selectedPictures);
export const getClickedCards = createSelector(GameStore, (state: GameState) => state.clicked);
export const getPictures = (quantity: number) => createSelector(GameStore, (state: GameState) => {
  const selected = [ ...state.availablePictures ].sort(() => 0.5 - Math.random()).slice(0, quantity);
  return [ ...selected, ...selected ].sort(() => 0.5 - Math.random());
});

