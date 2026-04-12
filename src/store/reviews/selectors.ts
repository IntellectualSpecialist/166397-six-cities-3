import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectReviews = (state: State) => state[NameSpace.Reviews].reviews;
export const selectReviewsStatus = (state: State) => state[NameSpace.Reviews].status;
