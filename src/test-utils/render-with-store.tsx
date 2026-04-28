import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { State } from '../types';
import { createAPI } from '../services';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export const renderWithStore = (
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
};
