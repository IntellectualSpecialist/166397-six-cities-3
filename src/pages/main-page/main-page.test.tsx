import { render, screen } from '@testing-library/react';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import MainPage from './main-page';
import { makeFakeStore } from '../../test-utils';

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Cities';
    const preparedComponent = renderWithHistory(<MainPage />);
    const { withStoreComponent } = renderWithStore(preparedComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('cities')).toBeInTheDocument();
  });
});
