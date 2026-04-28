import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import { makeFakeStore } from '../../test-utils';
import FavoritesPage from './favorites-page';
import { render, screen } from '@testing-library/react';

describe('Component: FavoritesPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly ', () => {
    const withHistoryComponent = renderWithHistory(<FavoritesPage/>, mockHistory);
    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
  });

});
