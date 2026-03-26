import { useEffect, useRef } from 'react';
import { City, Offer } from '../../types/offer-type';
import useMap from '../../hooks/use-map';
import { layerGroup, Marker, Icon } from 'leaflet';
import { Nullable } from 'vitest';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  activeOffer: Nullable<Offer>;
  city: City;
  className?: string;
}

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const Map = ({offers, activeOffer, city, className}: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef(layerGroup());

  useEffect(() => {
    if (map) {
      const {location} = city;
      const {latitude, longitude, zoom} = location;

      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();

      map.setView([latitude, longitude], zoom);
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {

      offers.forEach((offer) => {
        const {location} = offer;
        const {latitude, longitude} = location;

        const marker = new Marker({
          lat: latitude,
          lng: longitude
        });

        marker.setIcon(activeOffer && offer.id === activeOffer.id ? currentCustomIcon : defaultCustomIcon).addTo(markerLayer.current);
      });
    }
  }, [map, offers, activeOffer]);

  return (
    <section className={`${className} map`} ref={mapRef} />
  );
};

export default Map;
