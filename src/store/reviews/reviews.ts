import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { ReviewsData } from '../../types/state-type';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  reviewsStatus: RequestStatus.Idle,
  reviewStatus: RequestStatus.Idle
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsStatus = RequestStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsStatus = RequestStatus.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = RequestStatus.Failed;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.reviewStatus = RequestStatus.Loading;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.reviewStatus = RequestStatus.Success;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.reviewStatus = RequestStatus.Failed;
      });
  },
});
