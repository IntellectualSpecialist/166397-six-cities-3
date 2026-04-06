import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuthorization, setError } from './action';
import { CityNameType, Offer } from '../types/offer-type';
import { AuthorizationStatus, CityName } from '../const';

type initialState = {
  city: CityNameType;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: initialState = {
  city: CityName[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
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
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
