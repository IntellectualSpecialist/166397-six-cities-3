import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { withHistory, withStore } from '../../utils';
import { makeFakeStore } from '../../utils';
import FavoritesPage from './favorites-page';
import { render, screen } from '@testing-library/react';

describe('Component: FavoritesPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly ', () => {
    const withHistoryComponent = withHistory(<FavoritesPage/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
  });

});
