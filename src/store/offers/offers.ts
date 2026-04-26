import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, NameSpace, RequestStatus } from '../../const';
import { OffersData } from '../../types';
import { changeFavoriteStatusAction, fetchOffersAction } from '../api-actions';
import { CityNameType } from '../../types';

const initialState: OffersData = {
  offers: [],
  city: CityName[0],
  status: RequestStatus.Idle
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityNameType>) => {
      state.city = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const currentOffer = state.offers.find((offer) => offer.id === action.payload.id);

        if (currentOffer) {
          currentOffer.isFavorite = action.payload.isFavorite;
        }
      });
  },
});

export const {changeCity} = offers.actions;
