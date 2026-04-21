
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Places from './places';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    const preparedComponent = withHistory(<Places className='fake' offers={[mockOffer]} cardClassName='fake' imgClassName='fake' listClassName='fake' />);

    render(preparedComponent);

    expect(screen.getByTestId('places')).toBeInTheDocument();
  });
});
