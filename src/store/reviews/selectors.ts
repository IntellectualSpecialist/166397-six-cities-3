import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectReviews = createSelector(
  [(state: Pick<State, NameSpace.Reviews>) => state[NameSpace.Reviews].reviews],
  (reviews) => [...reviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
);
export const selectReviewsStatus = (state: Pick<State, NameSpace.Reviews>) => state[NameSpace.Reviews].reviewsStatus;
export const selectReviewStatus = (state: Pick<State, NameSpace.Reviews>) => state[NameSpace.Reviews].reviewStatus;
