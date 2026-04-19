import { NameSpace, RequestStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { selectFavorites, selectFavoritesStatus, selectFavoriteStatus } from './selectors';

describe('Favorite selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Favorite]: {
      favorites: [mockOffer],
      favoriteStatus: RequestStatus.Idle,
      favoritesStatus: RequestStatus.Idle,
    }
  };

  it('should return favorites from state', () => {
    const { favorites } = state[NameSpace.Favorite];
    const result = selectFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('should return favorites data loading status from state', () => {
    const { favoritesStatus } = state[NameSpace.Favorite];
    const result = selectFavoritesStatus(state);
    expect(result).toEqual(favoritesStatus);
  });

  it('should return favorite data loading status', () => {
    const { favoriteStatus } = state[NameSpace.Favorite];
    const result = selectFavoriteStatus(state);
    expect(result).toEqual(favoriteStatus);
  });
});
