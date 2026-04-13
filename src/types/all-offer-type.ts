import { Offer } from './offer-type';
import { ExtraOffer } from './extra-offer';

export type AllOfferType = Offer | ExtraOffer;

export type AllOffersType = AllOfferType[];
