import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectUser = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].user;
export const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus;
export const selectRequestStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].requestStatus;
