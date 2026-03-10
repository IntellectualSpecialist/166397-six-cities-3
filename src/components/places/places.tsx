import {PropsWithChildren} from 'react';
import PlaceCard from '../place-card/place-card';

type Offer = {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

type PlacesProps = PropsWithChildren<{
  offers: Offer[];
  className: string;
  listClassName: string;
  cardClassName: string;
  imgClassName: string;
}>;

function Places({ offers, className, listClassName, cardClassName, imgClassName, children}: PlacesProps): JSX.Element {
  return (
    <section className={`${className} places`}>
      {children}
      <div className={`${listClassName} cities__places-list places__list tabs__content`}>
        {offers.map(({id, isPremium, previewImage, price, isFavorite, rating, title, type}) => <PlaceCard key={id} isPremium={isPremium} previewImage={previewImage} price={price} isFavorite={isFavorite} rating={rating} title={title} type={type} className={cardClassName} imgClassName={imgClassName} />)}
      </div>
    </section>
  );
}

export default Places;
