import { sortOffers } from './sorting';
import { makeFakeOffer } from '../utils/mocks';
import { SortingOption } from '../const';

describe('sortOffers', () => {
  const offers = [
    makeFakeOffer({ price: 100, rating: 4.5, title: 'A' }),
    makeFakeOffer({ price: 50, rating: 5, title: 'B' }),
    makeFakeOffer({ price: 200, rating: 3, title: 'C' }),
  ];

  it('should return original array for "Popular" sorting', () => {
    const result = sortOffers(SortingOption[0], offers);
    expect(result).toEqual(offers);
  });

  it('should sort by price low to high', () => {
    const result = sortOffers('Price: low to high', offers);
    expect(result[0].price).toBe(50);
    expect(result[1].price).toBe(100);
    expect(result[2].price).toBe(200);
  });

  it('should sort by price high to low', () => {
    const result = sortOffers('Price: high to low', offers);
    expect(result[0].price).toBe(200);
    expect(result[1].price).toBe(100);
    expect(result[2].price).toBe(50);
  });

  it('should sort by rating top rated first', () => {
    const result = sortOffers('Top rated first', offers);
    expect(result[0].rating).toBe(5);
    expect(result[1].rating).toBe(4.5);
    expect(result[2].rating).toBe(3);
  });
});
