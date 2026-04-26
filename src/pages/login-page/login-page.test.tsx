import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import LoginPage from './login-page';
import { createMemoryHistory, MemoryHistory } from 'history';
import { makeFakeStore } from '../../utils';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: LoginPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        USER:
        {
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
          requestStatus: RequestStatus.Idle
        }
      }));
    mockHistory.push(AppRoute.Login);
    const expectedText = 'sign-in';

    render(withStoreComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('loginElement')).toBeInTheDocument();
    expect(screen.getByTestId('passwordElement')).toBeInTheDocument();
  });
});
