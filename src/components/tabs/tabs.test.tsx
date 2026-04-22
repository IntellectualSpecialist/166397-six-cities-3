import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

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
