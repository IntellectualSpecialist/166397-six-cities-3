import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, loadOffer, requireAuthorization, setOffersDataLoadingStatus, loadNearby, loadReviews, setReviewSendStatus } from './action';
import { CityNameType, Offer } from '../types/offer-type';
import { AuthorizationStatus, CityName } from '../const';
import { ExtraOffer } from '../types/extra-offer';
import { ReviewType } from '../types/review-type';

type initialState = {
  city: CityNameType;
  offers: Offer[];
  offer: null | ExtraOffer;
  nearby: Offer[];
  reviews: ReviewType[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isReviewSending: boolean;
  error: string | null;
}

const initialState: initialState = {
  city: CityName[0],
  offers: [],
  offer: null,
  nearby: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isReviewSending: false,
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearby, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setReviewSendStatus, (state, action) => {
      state.isReviewSending = action.payload;
    });
});

export { reducer };
