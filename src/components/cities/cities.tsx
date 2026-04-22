import { useCallback, useMemo, useState } from 'react';
import { sortOffers } from '../../utils/sorting';
import { Nullable } from 'vitest';
import { City, Offer } from '../../types/offer-type';
import { SortingOptionType } from '../../types/sorting-option-type';
import { CITIES, SortingOption } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectCity, selectOffers } from '../../store/offers/selectors';
import Places from '../places/places';
import Sorting from '../sorting/sorting';
import Map from '../map/map';
import CitiesEmpty from '../cities-empty/cities-empty';
import { filterOffersByCity } from '../../utils/common';

const Cities = (): JSX.Element => {
  const [activeOffer, setActiveOffer] = useState <Nullable<Offer>>(null);
  const [currentSorting, setCurrentSorting] = useState<SortingOptionType>(SortingOption[0]);
  const currentCityName = useAppSelector(selectCity);
  const offers = useAppSelector(selectOffers);

  const handleActiveCardChange = useCallback((offer?: Offer): void => {
    setActiveOffer(offer || null);
  }, []);

  const handleSortingOptionClick = useCallback((option: SortingOptionType): void => {
    setCurrentSorting(option);
  }, []);

  const currentCity = CITIES.find((city) => city.name === currentCityName);

  const currentOffers = useMemo(() => filterOffersByCity(offers ?? [], currentCityName ?? ''), [offers, currentCityName]);

  const placesCount = currentOffers?.length ?? 0;

  const sortedCurrentOffers = useMemo(() => sortOffers(currentSorting, currentOffers), [currentSorting, currentOffers]);

  if (!currentOffers?.length) {
    return <CitiesEmpty city={currentCityName} data-testid="cities-empty" />;
  }

  return (
    <div className="cities__places-container container">
      <Places
        offers={sortedCurrentOffers}
        className='cities__places'
        listClassName='cities__places-list tabs__content'
        cardClassName='cities__card'
        imgClassName='cities__image-wrapper'
        onActiveCardChange={handleActiveCardChange}
        data-testid="places"
      >
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesCount} place{placesCount === 1 ? '' : 's'} to stay in Amsterdam</b>
        <Sorting currentOption={currentSorting} onSortingOptionClick={handleSortingOptionClick} />
      </Places>
      <div className="cities__right-section">
        <Map className='cities__map' activeOffer={activeOffer} offers={currentOffers} city={currentCity as City} data-testid="map" />
      </div>
    </div>
  );
};

export default Cities;
