import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { FavoriteData } from '../../types/state-type';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';

const initialState: FavoriteData = {
  favorites: [],
  favoritesStatus: RequestStatus.Idle
};

export const favorite = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoritesStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesStatus = RequestStatus.Failed;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
        }
      });
  },
});
