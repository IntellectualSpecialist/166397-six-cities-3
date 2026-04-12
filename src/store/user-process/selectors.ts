import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const selectUser = (state: State) => state[NameSpace.User].user;
export const selectAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const selectAuthorizationRequestStatus = (state: State) => state[NameSpace.User].requestStatus;
