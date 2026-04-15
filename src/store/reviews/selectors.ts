import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectReviews = createSelector(
  [(state: State) => state[NameSpace.Reviews].reviews],
  (reviews) => reviews.toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
);
export const selectReviewsStatus = (state: State) => state[NameSpace.Reviews].reviewsStatus;
export const selectReviewStatus = (state: State) => state[NameSpace.Reviews].reviewStatus;
