import { Helmet } from 'react-helmet-async';
import Tab from '../../ui/tab/tab';
import PlaceCard from '../../ui/place-card/place-card';
import { useAppSelector } from '../../hooks';
import { selectFavorites, selectFavoritesStatus } from '../../store/favorite/selectors';
import { RequestStatus } from '../../const';
import LoadingPage from '../loading-page/loading-page';

const FavoritesPage = (): JSX.Element => {
  const favorites = useAppSelector(selectFavorites);
  const cities = Array.from(new Set(favorites.map((offer) => offer.city.name)));
  const status = useAppSelector(selectFavoritesStatus);

  if (status === RequestStatus.Loading) {
    return (<LoadingPage />);
  }

  return (
    <>
      <Helmet>
        <title>6 cities. Избранное</title>
      </Helmet>

      <div className="page__favorites-container container">
        <section className={`favorites  ${favorites?.length ? '' : 'favorites--empty'}`} data-testid="favorites">
          {favorites?.length ? (
            <>
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <Tab name={city} />
                    </div>
                    <div className="favorites__places">
                      {favorites.filter((favorite) => favorite.city.name === city).map((favorite) => (
                        <PlaceCard
                          key={favorite.id}
                          offer={favorite}
                          className="favorites__card"
                          imgClassName="favorites__image-wrapper"
                          imgWidth={150}
                          imgHeight={110}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </>) : (
            <>
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default FavoritesPage;
