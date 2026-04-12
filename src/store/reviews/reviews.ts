import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { ReviewsData } from '../../types/state-type';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  status: RequestStatus.Idle
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.status = RequestStatus.Success;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
});
