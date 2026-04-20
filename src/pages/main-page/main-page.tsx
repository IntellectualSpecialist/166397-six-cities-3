import {Helmet} from 'react-helmet-async';
import Tabs from '../../components/tabs/tabs';
import { useEffect } from 'react';
import { RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOffersStatus } from '../../store/offers/selectors';
import { fetchOffersAction } from '../../store/api-actions';
import LoadingPage from '../loading-page/loading-page';
import Cities from '../../components/cities/cities';

const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const offersStatus = useAppSelector(selectOffersStatus);

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

      <div className="cities" data-testid="cities">
        <Cities />
      </div>
    </>
  );
};

export default MainPage;
