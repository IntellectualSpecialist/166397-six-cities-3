import { renderHook } from '@testing-library/react';

import { Map } from 'leaflet';
import { vi } from 'vitest';
import { CITIES } from '../const';
import useMap from './use-map';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  return {
    ...actual,
    map: vi.fn().mockReturnValue({
      setView: vi.fn().mockReturnThis(),
      remove: vi.fn(),
    }),
    tileLayer: vi.fn().mockReturnValue({
      addTo: vi.fn(),
    }),
  };
});

describe('Hook: useMap', () => {
  let mapRef: { current: HTMLDivElement | null };

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
  });

  it('should return map instance', () => {
    const city = {
      ...CITIES[0]
    };

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBeInstanceOf(Map);
  });
});
