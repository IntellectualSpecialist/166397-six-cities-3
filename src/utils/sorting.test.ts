import { getSortReviewsByDate, sortOffers } from './sorting';
import { makeFakeOffer, makeFakeReview } from '../test-utils';
import { SortingOptions } from '../const';

describe('sortOffers', () => {
  const offers = [
    makeFakeOffer({ price: 100, rating: 4.5, title: 'A' }),
    makeFakeOffer({ price: 50, rating: 5, title: 'B' }),
    makeFakeOffer({ price: 200, rating: 3, title: 'C' }),
  ];

  it('should return original array for "Popular" sorting', () => {
    const result = sortOffers(SortingOptions[0], offers);
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

describe('getSortReviewsByDate', () => {
  it('should return empty array when input is empty', () => {
    const result = getSortReviewsByDate([]);
    expect(result).toEqual([]);
  });

  it('should return the same array when input has one element', () => {
    const review = makeFakeReview();
    const result = getSortReviewsByDate([review]);
    expect(result).toEqual([review]);
  });

  it('should sort reviews from oldest to newest by date', () => {
    const oldReview = makeFakeReview({ date: '2023-01-01T00:00:00.000Z' });
    const middleReview = makeFakeReview({ date: '2023-06-01T00:00:00.000Z' });
    const newReview = makeFakeReview({ date: '2023-12-31T23:59:59.999Z' });

    const unsorted = [newReview, oldReview, middleReview];
    const sorted = getSortReviewsByDate(unsorted);

    expect(sorted[0]).toBe(newReview);
    expect(sorted[1]).toBe(middleReview);
    expect(sorted[2]).toBe(oldReview);
  });

  it('should not mutate the original array', () => {
    const original = [makeFakeReview({ date: '2023-12-01' }), makeFakeReview({ date: '2023-01-01' })];
    const originalCopy = [...original];
    getSortReviewsByDate(original);
    expect(original).toEqual(originalCopy);
  });

  it('should handle equal dates (stable sort is not required, but should not crash)', () => {
    const date = '2023-05-05T12:00:00.000Z';
    const reviewA = makeFakeReview({ date });
    const reviewB = makeFakeReview({ date });
    const result = getSortReviewsByDate([reviewA, reviewB]);

    expect(result).toHaveLength(2);
    expect(result).toContain(reviewA);
    expect(result).toContain(reviewB);
  });
});
