import { RequestStatus } from '../../const';
import { makeFakeFavoriteOffer, makeFakeOffer } from '../../utils/mocks';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';
import { favorite } from './favorite';

describe('Favorite Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };
    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with offers, set "favoritesStatus" to "Success" when "fetchFavoritesAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [mockOffer],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Success,
    };

    const result = favorite.reducer(initialState, fetchFavoritesAction.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "favoritesStatus" to "Loading" when "fetchFavoritesAction.pending"', () => {
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Loading,
    };

    const result = favorite.reducer(initialState, fetchFavoritesAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoritesStatus" to "Failed" when "fetchFavoritesAction.rejected"', () => {
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Failed,
    };

    const result = favorite.reducer(initialState, fetchFavoritesAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteStatus" to "Loading" when "changeFavoriteStatusAction.pending"', () => {
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Loading,
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteStatus" to "Failed" when "changeFavoriteStatusAction.rejected"', () => {
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };

    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Failed,
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should add offer to "favorites" when "changeFavoriteStatusAction.fulfilled" with status 1', () => {
    const mockOffer = makeFakeFavoriteOffer();
    const initialState = {
      favorites: [],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };
    const expectedState = {
      favorites: [mockOffer],
      favoriteStatus: RequestStatus.Success,
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.fulfilled(mockOffer, '', {id: mockOffer.id, status: 1}));

    expect(result).toEqual(expectedState);
  });

  it('should remove offer from "favorites" when "changeFavoriteStatusAction.fulfilled" with status 0', () => {
    const mockOffer = makeFakeFavoriteOffer();
    const initialState = {
      favorites: [mockOffer],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    };
    const expectedState = {
      favorites: [],
      favoriteStatus: RequestStatus.Success,
      favoritesStatus: RequestStatus.Idle,
    };

    const result = favorite.reducer(initialState, changeFavoriteStatusAction.fulfilled(mockOffer, '', {id: mockOffer.id, status: 0}));

    expect(result).toEqual(expectedState);
  });
});
