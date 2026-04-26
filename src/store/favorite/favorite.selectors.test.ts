import { NameSpace, RequestStatus } from '../../const';
import { makeFakeOffer } from '../../utils';
import { selectFavorites, selectFavoritesStatus } from './selectors';

describe('Favorite selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Favorite]: {
      favorites: [mockOffer],
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
});
