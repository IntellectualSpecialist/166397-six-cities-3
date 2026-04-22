import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Tab from './tab';
import { CityName } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const expectedText = CityName[0];
    const preparedComponent = withHistory(<Tab name={CityName[0]} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should call onTabClick when clicked', async () => {
    const mockOnTabClick = vi.fn();
    const preparedComponent = withHistory(
      <Tab name={CityName[0]} onTabClick={mockOnTabClick} />
    );

    render(preparedComponent);
    await userEvent.click(screen.getByTestId('tab-link'));

    expect(mockOnTabClick).toBeCalledTimes(1);
  });
});
