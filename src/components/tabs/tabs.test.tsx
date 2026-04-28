import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import { makeFakeStore } from '../../test-utils';

describe(
  'Component: Tab',
  () => {
    it('should render correctly', () => {
      const preparedComponent = renderWithHistory(<Tabs />);
      const { withStoreComponent } = renderWithStore(preparedComponent, makeFakeStore());

      render(withStoreComponent);

      expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
    });
  }
);
