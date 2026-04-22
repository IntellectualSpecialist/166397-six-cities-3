import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MainPage from './main-page';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Cities';
    const preparedComponent = withHistory(<MainPage />);
    const { withStoreComponent } = withStore(preparedComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('cities')).toBeInTheDocument();
  });
});
