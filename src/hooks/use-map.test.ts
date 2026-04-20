import { renderHook } from '@testing-library/react';
import { CityName } from '../const';
import useMap from './use-map';
import { Map } from 'leaflet';

describe('Hook: useMap', () => {
  let mapRef: { current: HTMLDivElement | null };

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
  });

  it('should return map instance', () => {
    const result = renderHook(() => useMap(mapRef, {
      name: CityName[0],
      location: { latitude: 0, longitude: 0, zoom: 13 },
    }));

    expect(result).toBeInstanceOf(Map);
  });
});
