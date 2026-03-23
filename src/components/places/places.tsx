import { PropsWithChildren } from 'react';
import PlaceCard from '../../ui/place-card/place-card';
import { Offer } from '../../types/offer-type';

type PlacesProps = PropsWithChildren<{
  offers: Offer[];
  className: string;
  listClassName: string;
  cardClassName: string;
  imgClassName: string;
  onActiveCardChange?: (offer?: Offer) => void;
}>;

const Places = ({ offers, className, listClassName, cardClassName, imgClassName, children, onActiveCardChange}: PlacesProps): JSX.Element => (
  <section className={`${className} places`}>
    {children}
    <div className={`${listClassName} cities__places-list places__list tabs__content`}>
      {offers.map((offer) =>
        (<PlaceCard key={offer.id} offer={offer} className={cardClassName} imgClassName={imgClassName} handleActiveCardChange={onActiveCardChange} />
        ))}
    </div>
  </section>
);

export default Places;
