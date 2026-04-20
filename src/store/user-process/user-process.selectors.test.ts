import { AuthorizationStatus, NameSpace, RequestStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';
import { selectAuthorizationStatus, selectRequestStatus, selectUser } from './selectors';

describe('User selectors', () => {
  const mockUser = makeFakeUser();
  const state = {
    [NameSpace.User]: {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
      requestStatus: RequestStatus.Idle,
    }
  };

  it('should return user from state', () => {
    const { user } = state[NameSpace.User];
    const result = selectUser(state);
    expect(result).toEqual(user);
  });

  it('should return user loading status from state', () => {
    const { requestStatus } = state[NameSpace.User];
    const result = selectRequestStatus(state);
    expect(result).toEqual(requestStatus);
  });

  it('should return "true" because auth status is "Auth"', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const newState = {
      [NameSpace.User]: {
        user: mockUser,
        authorizationStatus,
        requestStatus: RequestStatus.Idle,
      }
    };

    const result = selectAuthorizationStatus(newState);

    expect(result).toBe(true);
  });

  it('should return "false" because auth status is "Unknown"', () => {
    const authorizationStatus = AuthorizationStatus.Unknown;
    const newState = {
      [NameSpace.User]: {
        user: mockUser,
        authorizationStatus,
        requestStatus: RequestStatus.Idle,
      }
    };

    const result = selectAuthorizationStatus(newState);

    expect(result).toBe(false);
  });
});
