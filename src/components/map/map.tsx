import { useEffect, useRef } from 'react';
import { Offer } from '../../types/offer-type';
import useMap from '../../hooks/use-map';
import { layerGroup, Marker, Icon } from 'leaflet';
import { Nullable } from 'vitest';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  activeOffer: Nullable<Offer>;
  className?: string;
}

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 20]
});

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 20]
});

const Map = ({offers, activeOffer, className}: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const {location} = offer;
        const {latitude, longitude} = location;

        const marker = new Marker({
          lat: latitude,
          lng: longitude
        });

        marker.setIcon(activeOffer && offer.id === activeOffer.id ? currentCustomIcon : defaultCustomIcon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOffer]);

  return (
    <section className={`${className} map`} ref={mapRef}>
    </section>
  );
};

export default Map;
