import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PairInitialState, PairFilterForm } from './pair.interface';
import {
  acceptPairThunk,
  getPairsInfoThunk,
  getUserPairsThunk,
  refusePairThunk,
} from './pair.thunks';
import type { ShortUser } from '@/shared/api/interfaces';
import { sortItemBySettings } from '../../lib';
import { PAGINATION_TAKE } from '@/shared/lib/constants';

const initialState: PairInitialState = {
  pairs: [],
  isPairsLoading: false,
  isPairsEnded: false,
  isPairsInfoLoading: true,
  pairsInfo: {
    count: 0,
    picture: null,
  },
};

const pairSlice = createSlice({
  name: 'pairSlice',
  initialState,
  reducers: {
    filterPairs: (state, { payload }: PayloadAction<PairFilterForm>) => {
      state.pairs = state.pairs.filter((user: ShortUser) =>
        sortItemBySettings(user, payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPairsThunk.pending, (state) => {
        state.isPairsLoading = true;
      })
      .addCase(
        getUserPairsThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser[]>) => {
          if (payload.length < PAGINATION_TAKE) {
            state.isPairsEnded = true;
          }

          state.pairs = state.pairs.concat(payload);
          state.isPairsLoading = false;
        }
      )
      .addCase(
        acceptPairThunk.fulfilled,
        (state, { payload: pairId }: PayloadAction<string>) => {
          state.pairsInfo.count--;
          state.pairs = state.pairs.filter((pair) => pair.id !== pairId);
        }
      )
      .addCase(
        refusePairThunk.fulfilled,
        (state, { payload: pairId }: PayloadAction<string>) => {
          state.pairsInfo.count--;
          state.pairs = state.pairs.filter((pair) => pair.id !== pairId);
        }
      )
      .addCase(getPairsInfoThunk.pending, (state) => {
        state.isPairsInfoLoading = true;
      })
      .addCase(getPairsInfoThunk.fulfilled, (state, { payload }) => {
        state.pairsInfo = payload;
        state.isPairsInfoLoading = false;
      });
  },
});

export const { filterPairs } = pairSlice.actions;

export const pairReducer = pairSlice.reducer;
