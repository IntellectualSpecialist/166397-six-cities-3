import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers } from './action';
import { CityNameType } from '../types/offer-type';
import { offers } from '../mocks/offers';
import { CityName } from '../const';

const initialState = {
  city: CityName[0] as CityNameType,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
