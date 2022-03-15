import { Action, applyMiddleware, combineReducers, createStore, Reducer } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import game from './reducer';

const appReducer: Reducer = combineReducers({
  game
});

const rootReducer = (state: any, action: Action): Reducer => appReducer(state, action);

export const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type ReduxState = ReturnType<ReturnType<typeof rootReducer>>;
