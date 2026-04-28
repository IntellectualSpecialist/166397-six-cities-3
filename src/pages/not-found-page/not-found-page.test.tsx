import { render, screen } from '@testing-library/react';
import { renderWithHistory } from '../../test-utils';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = '404. Page not found';
    const expectedLinkText = 'Вернуться на главную';
    const preparedComponent = renderWithHistory(<NotFoundPage />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
