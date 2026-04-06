import { createAction } from '@reduxjs/toolkit';
import { Offer, CityNameType } from '../types/offer-type';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<CityNameType>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
