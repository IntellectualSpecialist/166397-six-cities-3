import { createAction } from '@reduxjs/toolkit';
import { Offer, CityNameType } from '../types/offer-type';

export const changeCity = createAction('changeCity', (value: CityNameType) => ({
  payload: value,
}));
export const fillOffers = createAction('fillOffers', (value: Offer[]) => ({
  payload: value,
}));
