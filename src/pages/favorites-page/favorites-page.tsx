import { Helmet } from 'react-helmet-async';
import Tab from '../../ui/tab/tab';
import PlaceCard from '../../ui/place-card/place-card';
import { offers } from '../../mocks/offers';

const FavoritesPage = (): JSX.Element => (
  <>
    <Helmet>
      <title>6 cities. Избранное</title>
    </Helmet>

    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <Tab name="Amsterdam" />
            </div>
            <div className="favorites__places">
              {offers.slice(0, 2).map((offer) => <PlaceCard key={offer.id} offer={offer} className="favorites__card" imgClassName="favorites__image-wrapper" imgWidth={150} imgHeight={110} />)}
            </div>
          </li>
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <Tab name="Cologne" />
            </div>
            <div className="favorites__places">
              {offers.slice(0, 1).map((offer) => <PlaceCard key={offer.id} offer={offer} className="favorites__card" imgClassName="favorites__image-wrapper" imgWidth={150} imgHeight={110} />)}
            </div>
          </li>
        </ul>
      </section>
    </div>
  </>
);

export default FavoritesPage;
