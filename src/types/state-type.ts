import { Offer } from './offer-type';
import { CityNameType } from './offer-type';
import { store } from '../store';

export type State = {
  city: CityNameType;
  offers: Offer[] | [];
}

export type AppDispatch = typeof store.dispatch
