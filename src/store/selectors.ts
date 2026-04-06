import { State } from '../types/state-type';

const selectOffers = (state: State) => state.offers;
const selectCity = (state: State) => state.city;
const selectError = (state: State) => state.error;
const selectAuthorizationStatus = (state: State) => state.authorizationStatus;
const selectIsOffersDataLoading = (state: State) => state.isOffersDataLoading;

export {selectOffers, selectCity, selectError, selectAuthorizationStatus, selectIsOffersDataLoading};
