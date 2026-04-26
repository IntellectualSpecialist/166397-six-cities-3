import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import PageWrapper from './page-wrapper';
import { makeFakeStore } from '../../utils';

describe('Component: PageWrapper', () => {
  it('should render "PageWrapper" correctly', () => {
    const withHistoryComponent = withHistory(
      <PageWrapper />
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
