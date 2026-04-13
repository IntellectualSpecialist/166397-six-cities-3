import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectFavorites = (state: State) => state[NameSpace.Favorite].favorites;
export const selectFavoritesStatus = (state: State) => state[NameSpace.Favorite].favoritesStatus;
export const selectFavoriteStatus = (state: State) => state[NameSpace.Favorite].favoriteStatus;
