import { PropsWithChildren, useState } from 'react';
import PlaceCard from '../../ui/place-card/place-card';
import { Offer } from '../../types/offer-type';
import { Nullable } from 'vitest';

type PlacesProps = PropsWithChildren<{
  offers: Offer[];
  className: string;
  listClassName: string;
  cardClassName: string;
  imgClassName: string;
}>;

function Places({ offers, className, listClassName, cardClassName, imgClassName, children}: PlacesProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Nullable<Offer>>(null);

  function handleHover(offer?: Offer): void {
    setActiveCard(offer || null);
  }

  // eslint-disable-next-line no-console
  console.log(activeCard);


  return (
    <section className={`${className} places`}>
      {children}
      <div className={`${listClassName} cities__places-list places__list tabs__content`}>
        {offers.map((offer) =>
          (<PlaceCard key={offer.id} offer={offer} className={cardClassName} imgClassName={imgClassName} handleHover={handleHover} />
          ))}
      </div>
    </section>
  );
}

export default Places;
