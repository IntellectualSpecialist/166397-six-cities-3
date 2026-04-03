import { SortingOption } from '../const';
import { Offer } from '../types/offer-type';
import { SortingOptionType } from '../types/sorting-option-type';

const sortOffers = (sorting: SortingOptionType, offers: Offer[]): Offer[] => {
  switch (sorting) {
    case SortingOption[0]:
      return offers;
    case SortingOption[1]:
      return offers.toSorted((a, b): number => Number(a.price) - Number(b.price));
    case SortingOption[2]:
      return offers.toSorted((a, b): number => Number(b.price) - Number(a.price));
    case SortingOption[3]:
      return offers.toSorted((a, b): number => Number(b.rating) - Number(a.rating));
    default:
      return offers;
  }
};

export {sortOffers};
