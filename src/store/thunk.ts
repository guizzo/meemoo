import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACTION_FLUSH_PLAYER, ACTION_GET_RANKINGS, ACTION_SET_PLAYER, ACTION_SET_RANKINGS } from './actions';
import { Ranking } from '../models/ranking';

export const PREFIX = 'meemoo'

export const PLAYER_KEY = `${ PREFIX }-player`;
export const RANKINGS_KEY = `${ PREFIX }-rankings`;

export const SET_PLAYER = createAsyncThunk(ACTION_SET_PLAYER, async ({ player }: { player: string }): Promise<string> => {
  await localStorage.setItem(PLAYER_KEY, player);
  return player;
});

export const FLUSH_PLAYER = createAsyncThunk(ACTION_FLUSH_PLAYER, async (): Promise<void> => localStorage.removeItem(PLAYER_KEY));

export const GET_RANKINGS = createAsyncThunk(ACTION_GET_RANKINGS, async (): Promise<Ranking[]> => {
  let data: Ranking[] = [];
  try {
    const stored: string | null = await localStorage.getItem(RANKINGS_KEY);
    if (stored) {
      data = JSON.parse(stored);
    }
  } catch (e) {
    console.error(e);
  }
  return data;
});

export const SET_RANKING = createAsyncThunk(ACTION_SET_RANKINGS, async ({ player, score, time }: {
  player: string,
  score: number,
  time: number
}): Promise<number> => {
  let totalScore: number = 0;
  try {
    let data: Ranking[] = [];
    let currentRankings: Ranking[] = [];
    const stored: string | null = await localStorage.getItem(RANKINGS_KEY);
    if (stored) {
      currentRankings = JSON.parse(stored);
    }
    data = currentRankings.filter((ranking: Ranking) => ranking.player !== player);
    totalScore = score;
    if (time > 0) {
      totalScore = totalScore + (time * 25);
    }
    data = [ ...data, { player, score: totalScore } ].sort((a: Ranking, b: Ranking) => a.score > b.score ? -1 : 0);
    const newData = JSON.stringify(data);
    await localStorage.setItem(RANKINGS_KEY, newData);
  } catch (e) {
    console.error(e);
  }
  return totalScore;
});
