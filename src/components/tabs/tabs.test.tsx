import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { withHistory } from '../../utils/mock-component';

describe(
  'Component: Tab',
  () => {
    it('should render correctly', () => {
      const preparedComponent = withHistory(<Tabs />);

      render(preparedComponent);

      expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
    });
  }
);
