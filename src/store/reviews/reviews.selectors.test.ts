import { NameSpace, RequestStatus } from '../../const';
import { makeFakeReview } from '../../utils/mocks';
import { selectReviews, selectReviewsStatus, selectReviewStatus } from './selectors';

describe('Offer selectors', () => {
  const mockReview = makeFakeReview();
  const state = {
    [NameSpace.Reviews]: {
      reviews: [mockReview],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Idle,
    }
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = selectReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return city offers from state', () => {
    const { reviewsStatus } = state[NameSpace.Reviews];
    const result = selectReviewsStatus(state);
    expect(result).toEqual(reviewsStatus);
  });

  it('should return offer data loading status', () => {
    const { reviewStatus } = state[NameSpace.Reviews];
    const result = selectReviewStatus(state);
    expect(result).toEqual(reviewStatus);
  });
});
