import { Helmet } from 'react-helmet-async';
import { NewReview } from '../../types/review-type';
import Reviews from '../../components/reviews/reviews';
import Places from '../../components/places/places';
import ReviewForm from '../../components/review-form/review-form';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../authorizationStatus';
import Map from '../../components/map/map';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import { offer as pageOffer } from '../../mocks/offer';
import { capitalizeValue, getRaitingPercentage } from '../../utils/common';
import { reviews } from '../../mocks/reviews';
import { useAppSelector } from '../../hooks';

import FavoriteButton from '../../ui/favorite-button/favorite-button';

const MAX_PHOTOS_COUNT = 6;

const OfferPage = (): JSX.Element => {
  const {id: offerId} = useParams();
  const offers = useAppSelector((state) => state.offers);
  const {type, title, price, goods, images, rating, description, host, bedrooms, maxAdults, isPremium, isFavorite } = pageOffer;
  const authorizationStatus = getAuthorizationStatus();
  const isUserSignIn = authorizationStatus === AuthorizationStatus.Auth;
  const activeOffer = offers.find((offer) => offer.id === offerId);
  const starsWidth = getRaitingPercentage(rating);

  const handleFormSubmit = (review: NewReview): void => {
    // eslint-disable-next-line no-console
    console.log(review);
  };

  if (!activeOffer) {
    return <NotFoundPage />;
  }

  const nearOffers = offers.filter((offer) => offer.city.name === activeOffer?.city.name && offer.id !== offerId).slice(0, 3);
  const visibleOffers = [...nearOffers, activeOffer];

  return (
    <>
      <Helmet>
        <title>6 cities. Предложения</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src={image}
                  alt="Photo studio"
                />
              </div>
            )).slice(0, MAX_PHOTOS_COUNT)}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <FavoriteButton isFavorite={isFavorite} className='offer__bookmark-button' activeClassName='offer__bookmark-button--active' svgClassName='offer__bookmark-icon' />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: starsWidth }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{capitalizeValue(type)}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&rsquo;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((good) => (
                  <li key={good} className="offer__inside-item">{good}</li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{capitalizeValue(host.name)}</span>
                <span className="offer__user-status">{host.isPro ? 'Pro' : ''}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
                <p className="offer__text">
                An independent House, strategically located between Rembrand
                Square and National Opera, but where the bustle of the city
                comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
              </h2>
              {reviews?.length && <Reviews reviews={reviews} />}
              {isUserSignIn && <ReviewForm onSubmit={handleFormSubmit} />}
            </section>
          </div>
        </div>
        <Map className="offer__map" offers={visibleOffers} activeOffer={activeOffer} city={activeOffer.city} />
      </section>
      <div className="container">
        <Places className="near-places" imgClassName="near-places__image-wrapper" listClassName="near-places__list" cardClassName="near-places__card" offers={nearOffers}>
          <h2 className="near-places__title">
              Other places in the neighbourhood
          </h2>
        </Places>
      </div>
    </>
  );
};

export default OfferPage;
