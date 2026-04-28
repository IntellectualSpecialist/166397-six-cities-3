import { render, screen } from '@testing-library/react';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import PageWrapper from './page-wrapper';
import { makeFakeStore } from '../../test-utils';

describe('Component: PageWrapper', () => {
  it('should render "PageWrapper" correctly', () => {
    const withHistoryComponent = renderWithHistory(
      <PageWrapper />
    );

    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
