import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer-type';

export const changeCity = createAction('changeCity', (value: 'Amsterdam' | 'Paris' | 'Cologne' | 'Brussels' | 'Hamburg' | 'Dusseldorf') => ({
  payload: value,
}));
export const fillOffers = createAction('fillOffers', (value: Offer[]) => ({
  payload: value,
}));
