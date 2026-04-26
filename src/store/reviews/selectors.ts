import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types';
import { getSortReviewsByDate } from '../../utils';

export const selectReviews = createSelector(
  [(state: Pick<State, NameSpace.Reviews>) => state[NameSpace.Reviews].reviews],
  (reviews) => getSortReviewsByDate(reviews)
);
export const selectReviewsStatus = (state: Pick<State, NameSpace.Reviews>) => state[NameSpace.Reviews].reviewsStatus;
export const selectReviewStatus = (state: Pick<State, NameSpace.Reviews>) => state[NameSpace.Reviews].reviewStatus;
