import { render, screen } from '@testing-library/react';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import LoginPage from './login-page';
import { createMemoryHistory, MemoryHistory } from 'history';
import { makeFakeStore } from '../../test-utils';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: LoginPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = renderWithHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore(
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
