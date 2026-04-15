import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offer } from './offer/offer';
import { offers } from './offers/offers';
import { reviews } from './reviews/reviews';
import { userProcess } from './user-process/user-process';
import { favorite } from './favorite/favorite';

const rootReducer = combineReducers({
  [NameSpace.Offer]: offer.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.Reviews]: reviews.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Favorite]: favorite.reducer,
});

export { rootReducer };
