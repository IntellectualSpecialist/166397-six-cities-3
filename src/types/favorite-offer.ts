import { Offer } from './offer-type';

export type FavoriteOffer = Offer & {
  description: string;
  images: string[];
  goods: string[];
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  bedrooms: number;
  maxAdults: number;
}

export type OfferAndFavorite = Offer | FavoriteOffer

