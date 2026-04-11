import { Offer } from './offer-type';
import { ExtraOffer } from './extra-offer';

type AllOfferType = Offer | ExtraOffer;

export type AllOffersType = AllOfferType[];
