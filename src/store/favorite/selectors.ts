import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectFavorites = (state: Pick<State, NameSpace.Favorite>) => state[NameSpace.Favorite].favorites;
export const selectFavoritesStatus = (state: Pick<State, NameSpace.Favorite>) => state[NameSpace.Favorite].favoritesStatus;
