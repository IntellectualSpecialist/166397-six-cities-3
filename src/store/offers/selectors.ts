import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectOffers = (state: State) => state[NameSpace.Offers].offers;
export const selectIsOffersLoading = (state: State) => state[NameSpace.Offers].isOffersDataLoading;
export const selectOffersStatus = (state: State) => state[NameSpace.Offers].status;
export const selectCity = (state: State) => state[NameSpace.Offers].city;
