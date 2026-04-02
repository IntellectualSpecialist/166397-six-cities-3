import {Helmet} from 'react-helmet-async';
import { Offer } from '../../types/offer-type';
import Tabs from '../../components/tabs/tabs';
import Places from '../../components/places/places';
import Map from '../../components/map/map';
import { useState } from 'react';
import { Nullable } from 'vitest';
import { cities } from '../../mocks/cities';
import { City } from '../../types/offer-type';
import { useAppSelector } from '../../hooks';

const MainPage = (): JSX.Element => {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const currentCityName = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const handleActiveCardChange = (offer?: Offer): void => {
    setActiveOffer(offer || null);
  };

  const currentCity = cities.find((city) => city.name === currentCityName);

  const currentOffers = offers.filter((offer) => offer.city.name === currentCityName);

  const placesCount = currentOffers.length;

  return (
    <>
      <Helmet>
        <title>6 cities. Главная</title>
      </Helmet>

      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <div className="cities">
        <div className="cities__places-container container">
          <Places offers={currentOffers} className='cities__places' listClassName='cities__places-list tabs__content' cardClassName='cities__card' imgClassName='cities__image-wrapper' onActiveCardChange={handleActiveCardChange}>
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
              Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                Popular
                </li>
                <li className="places__option" tabIndex={0}>
                Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                Top rated first
                </li>
              </ul>
            </form>
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
