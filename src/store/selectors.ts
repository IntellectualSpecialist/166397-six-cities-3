import { State } from '../types/state-type';

const selectOffers = (state: State) => state.offers;
const selectOffer = (state: State) => state.offer;
const selectNearby = (state: State) => state.nearby;
const selectReviews = (state: State) => state.reviews;
const selectCity = (state: State) => state.city;
const selectError = (state: State) => state.error;
const selectAuthorizationStatus = (state: State) => state.authorizationStatus;
const selectIsOffersDataLoading = (state: State) => state.isOffersDataLoading;
const selectIsOfferLoading = (state: State) => state.isOfferLoading;
const selectUser = (state: State) => state.user;

export {selectOffers, selectOffer, selectNearby, selectReviews, selectCity, selectError, selectAuthorizationStatus, selectIsOffersDataLoading, selectIsOfferLoading, selectUser};
