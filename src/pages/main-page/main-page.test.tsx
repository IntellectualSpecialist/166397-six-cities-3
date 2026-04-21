import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import MainPage from './main-page';

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Cities';
    const preparedComponent = withHistory(<MainPage />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('cities')).toBeInTheDocument();
  });
});
