import { PropsWithChildren, useState } from 'react';
import PlaceCard from '../../ui/place-card/place-card';
import { Offer } from '../../types/offer-type';

type PlacesProps = PropsWithChildren<{
  offers: Offer[];
  className: string;
  listClassName: string;
  cardClassName: string;
  imgClassName: string;
}>;

function Places({ offers, className, listClassName, cardClassName, imgClassName, children}: PlacesProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // eslint-disable-next-line no-console
  console.log(activeCard);

  return (
    <section className={`${className} places`}>
      {children}
      <div className={`${listClassName} cities__places-list places__list tabs__content`}>
        {offers.map(({id, isPremium, previewImage, price, isFavorite, rating, title, type}) => <PlaceCard key={id} isPremium={isPremium} previewImage={previewImage} price={price} isFavorite={isFavorite} rating={rating} title={title} type={type} className={cardClassName} imgClassName={imgClassName} onMouseOver={() => setActiveCard(id)} />)}
      </div>
    </section>
  );
}

export default Places;
