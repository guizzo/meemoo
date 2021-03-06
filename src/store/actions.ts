import { createAction } from '@reduxjs/toolkit';

export const GAME = 'GAME';

export const ACTION_RESTART_GAME = 'RESTART GAME';
export const ACTION_SET_PLAYER = 'SET PLAYER';
export const ACTION_LAUNCH_GAME = 'LAUNCH GAME';
export const ACTION_FLUSH_PLAYER = 'FLUSH PLAYER';
export const ACTION_GET_RANKINGS = 'GET RANKINGS';
export const ACTION_SET_RANKINGS = 'SET RANKINGS';
export const ACTION_START_GAME = 'START GAME';
export const ACTION_END_GAME = 'END GAME';
export const ACTION_TIME_TICK = 'TIME TICK';
export const ACTION_SELECT_CARD = 'SELECT CARD';
export const ACTION_UPDATE_SCORE = 'UPDATE SCORE';
export const ACTION_ADD_SCORE = 'ADD SCORE';
export const ACTION_FLIP_CARD = 'FLIP CARD';
export const ACTION_SET_PAIR_CORRECT = 'SET PAIR CORRECT';
export const ACTION_SET_PAIR_WRONG = 'SET PAIR WRONG';

export const RESTART_GAME = createAction(ACTION_RESTART_GAME);
export const SET_PLAYER = createAction<string>(ACTION_SET_PLAYER);
export const LAUNCH_GAME = createAction(ACTION_LAUNCH_GAME);
export const START_GAME = createAction(ACTION_START_GAME);
export const END_GAME = createAction(ACTION_END_GAME);
export const TIME_TICK = createAction(ACTION_TIME_TICK);
export const SELECT_CARD = createAction<number>(ACTION_SELECT_CARD);
export const UPDATE_SCORE = createAction<number>(ACTION_UPDATE_SCORE)
export const ADD_SCORE = createAction<number>(ACTION_ADD_SCORE);
export const FLIP_CARD = createAction<number>(ACTION_FLIP_CARD);
export const SET_PAIR_CORRECT = createAction(ACTION_SET_PAIR_CORRECT);
export const SET_PAIR_WRONG = createAction(ACTION_SET_PAIR_WRONG);
