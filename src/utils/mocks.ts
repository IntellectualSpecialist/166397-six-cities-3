import {name, internet, lorem} from 'faker';
import { Offer } from '../types/offer-type';
import { AuthorizationStatus, CityName, Housing, RequestStatus } from '../const';
import { ExtraOffer } from '../types/extra-offer';
import { ReviewType } from '../types/review-type';
import { UserData } from '../types/user-data-type';
import { FavoriteOffer } from '../types/favorite-offer';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/state-type';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeOffer = (offersOptions?: Partial<Offer>): Offer => ({
  id: name.title(),
  title: name.title(),
  type: Housing.Apartment,
  price: 104,
  previewImage: internet.url(),
  city: {
    name: CityName[0],
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.858610000000006,
    longitude: 2.330499,
    zoom: 16
  },
  isFavorite: true,
  isPremium: false,
  rating: 4.9,
  ...offersOptions
});

export const makeFakeExtraOffer = (): ExtraOffer => ({
  id: name.title(),
  title: name.title(),
  type: Housing.Apartment,
  price: 136,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.85761,
    longitude: 2.358499,
    zoom: 16
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.6,
  bedrooms: 5,
  maxAdults: 4,
  description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  goods: new Array(3).fill(null).map(() => name.title()),
  host: {
    name: 'Angelina',
    isPro: true,
    avatarUrl: internet.url()
  },
  images: new Array(3).fill(null).map(() => internet.url()),
});

export const makeFakeFavoriteOffer = (): FavoriteOffer => ({
  id: name.title(),
  title: name.title(),
  type: Housing.Apartment,
  price: 136,
  previewImage: internet.url(),
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.85761,
    longitude: 2.358499,
    zoom: 16
  },
  isFavorite: true,
  isPremium: false,
  rating: 4.6,
  bedrooms: 5,
  maxAdults: 4,
  description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  goods: new Array(3).fill(null).map(() => name.title()),
  host: {
    name: 'Angelina',
    isPro: true,
    avatarUrl: internet.url()
  },
  images: new Array(3).fill(null).map(() => internet.url()),
});

export const makeFakeReview = (options?: Partial<ReviewType>): ReviewType => ({
  id: name.title(),
  date: new Date().toISOString(),
  user: {
    name: name.firstName(),
    isPro: true,
    avatarUrl: internet.avatar(),
  },
  rating: 4.6,
  comment: lorem.sentence(),
  ...options
});

export const makeFakeUser = (): UserData => ({
  name: name.firstName(),
  email: internet.email(),
  avatarUrl: internet.avatar(),
  token: internet.password(),
  isPro: true
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    requestStatus: RequestStatus.Idle
  },
  OFFERS: {
    offers: new Array(3).fill(null).map(() => makeFakeOffer()),
    city: CityName[0],
    status: RequestStatus.Idle
  },
  OFFER: {
    offer: makeFakeExtraOffer(),
    nearby: new Array(3).fill(null).map(() => makeFakeOffer()),
    status: RequestStatus.Idle
  },
  REVIEWS: {
    reviews: new Array(3).fill(null).map(() => makeFakeReview()),
    reviewsStatus: RequestStatus.Idle,
    reviewStatus: RequestStatus.Idle
  },
  FAVORITE: {
    favorites: new Array(3).fill(null).map(() => makeFakeFavoriteOffer()),
    favoritesStatus: RequestStatus.Idle
  },
  ...initialState ?? {},
});
