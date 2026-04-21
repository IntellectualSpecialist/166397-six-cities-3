import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import PageWrapper from './page-wrapper';

describe('Component: PageWrapper', () => {
  it('should render "PageWrapper" correctly', () => {
    const withHistoryComponent = withHistory(
      <PageWrapper />
    );

    const { withStoreComponent } = withStore(withHistoryComponent);
    render(withStoreComponent);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
