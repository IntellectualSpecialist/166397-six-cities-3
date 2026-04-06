import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuthorization } from './action';
import { CityNameType } from '../types/offer-type';
import { offers } from '../mocks/offers';
import { AuthorizationStatus, CityName } from '../const';

const initialState = {
  city: CityName[0] as CityNameType,
  offers,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
