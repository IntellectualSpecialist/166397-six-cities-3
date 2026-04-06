import { createAction } from '@reduxjs/toolkit';
import { Offer, CityNameType } from '../types/offer-type';

export const changeCity = createAction<CityNameType>('offers/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
