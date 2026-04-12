import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, NameSpace, RequestStatus } from '../../const';
import { OffersData } from '../../types/state-type';
import { fetchOffersAction } from '../api-actions';
import { CityNameType } from '../../types/offer-type';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
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
        state.isOffersDataLoading = true;
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.status = RequestStatus.Failed;
      });
  },
});

export const {changeCity} = offers.actions;
