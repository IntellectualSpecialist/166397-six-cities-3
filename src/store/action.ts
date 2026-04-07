import { createAction } from '@reduxjs/toolkit';
import { Offer, CityNameType } from '../types/offer-type';
import { AppRoute, AuthorizationStatus } from '../const';

export const changeCity = createAction<CityNameType>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('load/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('offers/setError');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
