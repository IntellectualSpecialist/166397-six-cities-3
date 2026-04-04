import { State } from '../types/state-type';

const selectOffers = (state: State) => state.offers;
const selectCity = (state: State) => state.city;

export {selectOffers, selectCity};
