import {Helmet} from 'react-helmet-async';
import { Offer } from '../../types/offer-type';
import Tabs from '../../components/tabs/tabs';
import Places from '../../components/places/places';
import Map from '../../components/map/map';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';
import { CITIES } from '../../const';
import { City } from '../../types/offer-type';
import { useAppSelector } from '../../hooks';
import Sorting from '../../components/sorting/sorting';
import { SortingOption } from '../../const';
import { sortOffers } from '../../utils/sorting';
import { SortingOptionType } from '../../types/sorting-option-type';
import { isEscKey } from '../../utils/common';

const MainPage = (): JSX.Element => {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const [currentSorting, setCurrentSorting] = useState<SortingOptionType>(SortingOption[0]);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const currentCityName = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const handleActiveCardChange = (offer?: Offer): void => {
    setActiveOffer(offer || null);
  };

  const handleSortingClick = (): void => {
    setIsSortingOpen((prev) => !prev);
  };

  const handleSortingOptionClick = (option: SortingOptionType): void => {
    setCurrentSorting(option);
    setIsSortingOpen(false);
  };

  const currentCity = CITIES.find((city) => city.name === currentCityName);

  const currentOffers = offers.filter((offer) => offer.city.name === currentCityName);

  const placesCount = currentOffers.length;

  const sortedCurrentOffers = sortOffers(currentSorting, currentOffers);

  useEffect(() => {
    if (isSortingOpen) {
      const onDocumentKeydown = (evt: KeyboardEvent) => {
        if (isEscKey(evt)) {
          evt.preventDefault();
          setIsSortingOpen(false);
        }
      };

      document.addEventListener('keydown', onDocumentKeydown);

      return () => {
        document.removeEventListener('keydown', onDocumentKeydown);
      };
    }
  }, [isSortingOpen]);

  return (
    <>
      <Helmet>
        <title>6 cities. Главная</title>
      </Helmet>

      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <div className="cities">
        <div className="cities__places-container container">
          <Places offers={sortedCurrentOffers} className='cities__places' listClassName='cities__places-list tabs__content' cardClassName='cities__card' imgClassName='cities__image-wrapper' onActiveCardChange={handleActiveCardChange}>
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesCount} place{placesCount > 1 ? 's' : ''} to stay in Amsterdam</b>
            <Sorting currentOption={currentSorting} isOpen={isSortingOpen} onSortingClick={handleSortingClick} onSortingOptionClick={handleSortingOptionClick} />
          </Places>
          <div className="cities__right-section">
            <Map className='cities__map' activeOffer={activeOffer} offers={currentOffers} city={currentCity as City} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
