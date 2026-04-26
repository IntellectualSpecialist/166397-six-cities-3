import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { withHistory, withStore } from '../../utils';
import { makeFakeStore } from '../../utils';

describe(
  'Component: Tab',
  () => {
    it('should render correctly', () => {
      const preparedComponent = withHistory(<Tabs />);
      const { withStoreComponent } = withStore(preparedComponent, makeFakeStore());

      render(withStoreComponent);

      expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
    });
  }
);
