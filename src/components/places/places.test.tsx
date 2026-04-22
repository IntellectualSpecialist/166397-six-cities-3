
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Places from './places';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const preparedComponent = withHistory(<Places className='fake' offers={[mockOffer]} cardClassName='fake' imgClassName='fake' listClassName='fake' />);
    const { withStoreComponent } = withStore(preparedComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId('places')).toBeInTheDocument();
  });
});
