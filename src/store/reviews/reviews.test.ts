import { RequestStatus } from '../../const';
import { makeFakeReview } from '../../test-utils';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';
import { reviews } from './reviews';

describe('Reviews Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Idle,
    };

    const result = reviews.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Idle,
    };

    const result = reviews.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with reviews, set "reviewsStatus" to "Success" when "fetchReviewsAction.fulfilled"', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      reviews: [mockReview],
      reviewsStatus: RequestStatus.Success,
      reviewStatus: RequestStatus.Idle,
    };

    const result = reviews.reducer(undefined, fetchReviewsAction.fulfilled([mockReview], '', mockReview.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewsStatus" to "Loading" when "fetchReviewsAction.pending"', () => {
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Loading,
      reviewStatus: RequestStatus.Idle,
    };

    const result = reviews.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewsStatus" to "Failed" when "fetchReviewsAction.rejected"', () => {
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Failed,
      reviewStatus: RequestStatus.Idle,
    };

    const result = reviews.reducer(undefined, fetchReviewsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewStatus" to "Loading" when "sendReviewAction.pending"', () => {
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Loading,
    };

    const result = reviews.reducer(undefined, sendReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with reviews, set "reviewStatus" to "Success" when "sendReviewAction.fulfilled"', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      reviews: [mockReview],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Success,
    };

    const result = reviews.reducer(undefined, sendReviewAction.fulfilled(
      mockReview,
      '',
      {
        id: mockReview.id,
        formData: {
          rating: mockReview.rating,
          review: mockReview.comment,
        },
      }
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewStatus" to "Failed" when "sendReviewAction.rejected"', () => {
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Failed,
    };

    const result = reviews.reducer(undefined, sendReviewAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewStatus" to "Loading" when "sendReviewAction.pending"', () => {
    const expectedState = {
      reviews: [],
      reviewsStatus: RequestStatus.Idle,
      reviewStatus: RequestStatus.Loading,
    };

    const result = reviews.reducer(undefined, sendReviewAction.pending);

    expect(result).toEqual(expectedState);
  });
});
