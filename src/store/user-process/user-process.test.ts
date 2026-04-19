import { AuthorizationStatus, RequestStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      requestStatus: RequestStatus.Success,
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "user" to user data, set "authorizationStatus" to "Auth", set "requestStatus" to "Success" when "checkAuthAction.fulfilled"', () => {
    const fakeUser = makeFakeUser();
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: fakeUser,
      requestStatus: RequestStatus.Success,
    };

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(fakeUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "requestStatus" to "Loading" when "checkAuthAction.pending"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      requestStatus: RequestStatus.Loading,
    };

    const result = userProcess.reducer(initialState, checkAuthAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", set "requestStatus" to "Failed" when "checkAuthAction.rejected"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      requestStatus: RequestStatus.Failed,
    };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "user" to user data, set "authorizationStatus" to "Auth", set "requestStatus" to "Success" when "loginAction.fulfilled"', () => {
    const fakeUser = makeFakeUser();
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: fakeUser,
      requestStatus: RequestStatus.Success,
    };

    const result = userProcess.reducer(initialState, loginAction.fulfilled(fakeUser, '', { login: fakeUser.email, password: 'password' }));

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", set "requestStatus" to "Failed" when "loginAction.rejected"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      requestStatus: RequestStatus.Failed,
    };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to pending, set "requestStatus" to "Loading" when "loginAction.pending"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      requestStatus: RequestStatus.Loading,
    };

    const result = userProcess.reducer(initialState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", set "requestStatus" to "Success", set "user" to null when "logoutAction.fulfilled"', () => {
    const fakeUser = makeFakeUser();
    const initialState = {
      user: fakeUser,
      authorizationStatus: AuthorizationStatus.Auth,
      requestStatus: RequestStatus.Idle,
    };
    const expectedState = {
      user: null,
      authorizationStatus: AuthorizationStatus.NoAuth,
      requestStatus: RequestStatus.Success,
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Loading", set "requestStatus" to "Loading" when "logoutAction.pending"', () => {
    const fakeUser = makeFakeUser();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: fakeUser,
      requestStatus: RequestStatus.Idle,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: fakeUser,
      requestStatus: RequestStatus.Loading,
    };

    const result = userProcess.reducer(initialState, logoutAction.pending);

    expect(result).toEqual(expectedState);
  });
});
