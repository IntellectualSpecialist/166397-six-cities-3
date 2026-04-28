import { RequestStatus } from '../../const';
import { FavoriteData } from '../../types';
import { makeFakeFavoriteOffer, makeFakeOffer } from '../../test-utils';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';
import { favorite } from './favorite';

describe('Favorite Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };
    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with offers, set "favoritesStatus" to "Success" when "fetchFavoritesAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [mockOffer],
      favoritesStatus: RequestStatus.Success,
    };

    const result = favorite.reducer(initialState, fetchFavoritesAction.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "favoritesStatus" to "Loading" when "fetchFavoritesAction.pending"', () => {
    const initialState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Loading,
    };

    const result = favorite.reducer(initialState, fetchFavoritesAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoritesStatus" to "Failed" when "fetchFavoritesAction.rejected"', () => {
    const initialState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Failed,
    };

    const result = favorite.reducer(initialState, fetchFavoritesAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should keep state when "changeFavoriteStatusAction.pending"', () => {
    const initialState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should keep state when "changeFavoriteStatusAction.rejected"', () => {
    const initialState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should add offer to "favorites" when "changeFavoriteStatusAction.fulfilled" with status 1', () => {
    const mockOffer = makeFakeFavoriteOffer();
    const initialState: FavoriteData = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };
    const expectedState: FavoriteData = {
      favorites: [mockOffer],
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.fulfilled(mockOffer, '', {id: mockOffer.id, status: 1}));

    expect(result).toEqual(expectedState);
  });

  it('should remove offer from "favorites" when "changeFavoriteStatusAction.fulfilled" with status 0', () => {
    const mockOffer = makeFakeFavoriteOffer();
    mockOffer.isFavorite = false;

    const initialState = {
      favorites: [mockOffer],
      favoritesStatus: RequestStatus.Idle,
    };
    const expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.fulfilled(mockOffer, '', {id: mockOffer.id, status: 0}));

    expect(result).toEqual(expectedState);
  });
});
