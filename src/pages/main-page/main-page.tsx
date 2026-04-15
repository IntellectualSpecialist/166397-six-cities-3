import {Helmet} from 'react-helmet-async';
import Tabs from '../../components/tabs/tabs';
import { useEffect } from 'react';
import { RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOffers, selectOffersStatus } from '../../store/offers/selectors';
import { fetchOffersAction } from '../../store/api-actions';
import LoadingPage from '../loading-page/loading-page';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities-empty/cities-empty';

const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const offersStatus = useAppSelector(selectOffersStatus);
  const offers = useAppSelector(selectOffers);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (offersStatus === RequestStatus.Loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <>
      <Helmet>
        <title>6 cities. Главная</title>
      </Helmet>

      <h1 className="visually-hidden">Cities</h1>
      <Tabs />

      <div className="cities">
        {offers?.length ? <Cities /> : <CitiesEmpty />}
      </div>
    </>
  );
};

export default MainPage;
