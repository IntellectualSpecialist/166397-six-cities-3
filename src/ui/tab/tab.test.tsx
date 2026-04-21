import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Tab from './tab';
import { CityName } from '../../const';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const expectedText = CityName[0];
    const preparedComponent = withHistory(<Tab name={CityName[0]} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
