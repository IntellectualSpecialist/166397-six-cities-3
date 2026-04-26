import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectOffer = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offer;
export const selectNearby = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearby;
export const selectOfferStatus = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].status;
