import { createMemoryHistory, MemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state-type';
import { createAPI } from '../services/api';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';

export const withHistory = (component: JSX.Element, history?: MemoryHistory) => {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
};

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
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
}
