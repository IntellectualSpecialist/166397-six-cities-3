import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeOffer } from '../../utils';

describe('Component: Map', () => {
  it('should render Map component', () => {
    const fakeOffer = makeFakeOffer();

    render(<Map activeOffer={fakeOffer} city={fakeOffer.city} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
