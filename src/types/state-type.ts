import { AuthorizationStatus, RequestStatus } from '../const';
import { store } from '../store';
import { ExtraOffer } from './extra-offer';
import { OffersAndFavorites } from './favorite-offer';
import { CityNameType, Offer } from './offer-type';
import { ReviewType } from './review-type';
import { UserData } from './user-data-type';

export type UserProcess = {
  user: null | UserData;
  authorizationStatus: AuthorizationStatus;
  requestStatus: RequestStatus;
}

export type OffersData = {
  offers: Offer[];
  city: CityNameType;
  status: RequestStatus;
}

export type OfferData = {
  offer: null | ExtraOffer;
  nearby: Offer[];
  status: RequestStatus;
}

export type ReviewsData = {
  reviews: ReviewType[];
  reviewsStatus: RequestStatus;
  reviewStatus: RequestStatus;
}

export type FavoriteData = {
  favorites: OffersAndFavorites;
  favoritesStatus: RequestStatus;
  favoriteStatus: RequestStatus;
}

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
