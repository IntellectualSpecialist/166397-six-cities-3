import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offers;
export const selectOffersStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].status;
export const selectCity = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].city;
