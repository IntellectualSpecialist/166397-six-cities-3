
import { render, screen } from '@testing-library/react';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import Places from './places';
import { makeFakeOffer, makeFakeStore } from '../../test-utils';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const preparedComponent = renderWithHistory(<Places className='fake' offers={[mockOffer]} cardClassName='fake' imgClassName='fake' listClassName='fake' />);
    const { withStoreComponent } = renderWithStore(preparedComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId('places')).toBeInTheDocument();
  });
});
