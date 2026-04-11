import { createAction } from '@reduxjs/toolkit';
import { Offer, CityNameType } from '../types/offer-type';
import { AppRoute, AuthorizationStatus } from '../const';
import { ExtraOffer } from '../types/extra-offer';
import { ReviewType } from '../types/review-type';
import { UserData } from '../types/user-data-type';

export const changeCity = createAction<CityNameType>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setUser = createAction<UserData | null>('data/setUser');

export const loadOffer = createAction<ExtraOffer>('data/loadOffer');

export const loadNearby = createAction<Offer[]>('data/loadNearby');

export const loadReviews = createAction<ReviewType[]>('data/loadReviews');

export const setOffersDataLoadingStatus = createAction<boolean>('load/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export const setOfferLoadingStatus = createAction<boolean>('load/setOfferLoadingStatus');
