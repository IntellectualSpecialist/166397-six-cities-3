import { SortingOption } from '../const';
import { Offer } from '../types';
import { ReviewType } from '../types';
import { SortingOptionType } from '../types';

const sortOffers = (sorting: SortingOptionType, offers: Offer[]): Offer[] => {
  switch (sorting) {
    case SortingOption[0]:
      return offers;
    case SortingOption[1]:
      return [...offers].sort((a, b): number => Number(a.price) - Number(b.price));
    case SortingOption[2]:
      return [...offers].sort((a, b): number => Number(b.price) - Number(a.price));
    case SortingOption[3]:
      return [...offers].sort((a, b): number => Number(b.rating) - Number(a.rating));
    default:
      return offers;
  }
};

const getSortReviewsByDate = (elements: ReviewType[]) => [...elements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export {sortOffers, getSortReviewsByDate};
