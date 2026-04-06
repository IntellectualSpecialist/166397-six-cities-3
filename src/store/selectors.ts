import { State } from '../types/state-type';

const selectOffers = (state: State) => state.offers;
const selectCity = (state: State) => state.city;
const selectError = (state: State) => state.error;

export {selectOffers, selectCity, selectError};
