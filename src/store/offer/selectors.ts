import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectOffer = (state: State) => state[NameSpace.Offer].offer;
export const selectNearby = (state: State) => state[NameSpace.Offer].nearby;
export const selectOfferStatus = (state: State) => state[NameSpace.Offer].status;
