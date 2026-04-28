import { Helmet } from 'react-helmet-async';
import Reviews from '../../components/reviews/reviews';
import Places from '../../components/places/places';
import ReviewForm from '../../components/review-form/review-form';
import { AppRoute, RequestStatus } from '../../const';
import Map from '../../components/map/map';
import { Navigate, useParams } from 'react-router-dom';
import { capitalizeValue, getRatingPercentage, isAuth } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import { useSelector } from 'react-redux';
import { fetchNearbyAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import { AllOfferType } from '../../types';
import { selectNearby, selectOffer, selectOfferStatus } from '../../store/offer/selectors';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { selectReviews, selectReviewsStatus } from '../../store/reviews/selectors';

const MAX_PHOTOS_COUNT = 6;
const MAX_NEARBY_COUNT = 3;
const MAX_REVIEWS_COUNT = 10;
const Avatar = {
  Width: 74,
  Heigh: 74,
} as const;

const OfferPage = (): JSX.Element => {
  const {id: offerId} = useParams();
  const dispatch = useAppDispatch();
  const pageOffer = useAppSelector(selectOffer);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const nearOffers = useAppSelector(selectNearby).slice(0, MAX_NEARBY_COUNT);
  const reviews = useAppSelector(selectReviews);
  const status = useAppSelector(selectOfferStatus);
  const reviewsStatus = useAppSelector(selectReviewsStatus);

  const visibleOffers = [...nearOffers, pageOffer];

  useEffect(() => {
    dispatch(fetchOfferAction(offerId as string));
    dispatch(fetchNearbyAction(offerId as string));
    dispatch(fetchReviewsAction(offerId as string));
  }, [offerId, dispatch]);

  if (status === RequestStatus.Failed) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (status === RequestStatus.Loading || !pageOffer || reviewsStatus === RequestStatus.Loading) {
    return <LoadingPage/>;
  }

  const {id, type, title, price, goods, images, rating, description, host: {isPro, name, avatarUrl}, bedrooms, maxAdults, isPremium, isFavorite } = pageOffer;

  const isUserSignIn = isAuth(authorizationStatus);
  const starsWidth = getRatingPercentage(rating);

  return (
    <>
      <Helmet>
        <title>6 cities. Предложения</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {!!images?.length && images.map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src={image}
                  alt="Photo studio"
                  data-testid={image}
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
              <FavoriteButton
                id={id}
                className='offer__bookmark-button'
                activeClassName='offer__bookmark-button--active'
                svgClassName='offer__bookmark-icon'
                testid="favorite-button"
                isFavorite={isFavorite}
              />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: starsWidth }} data-testid="rating-stars-main" />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire" data-testid="offer-type">
                {capitalizeValue(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedroom{bedrooms === 1 ? '' : 's'}
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adult{maxAdults === 1 ? '' : 's'}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&rsquo;s inside</h2>
              <ul className="offer__inside-list">
                {!!goods?.length && goods.map((good) => (
                  <li key={good} className="offer__inside-item">{good}</li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={avatarUrl}
                    width={Avatar.Width}
                    height={Avatar.Heigh}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{capitalizeValue(name)}</span>
                {isPro && <span className="offer__user-status" data-testid="host-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text" data-testid="offer-description">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
              </h2>
              {!!reviews?.length && <Reviews reviews={reviews.slice(0, MAX_REVIEWS_COUNT)} /> }
              {isUserSignIn && <ReviewForm id={pageOffer.id} />}
            </section>
          </div>
        </div>
        <Map className="offer__map" offers={visibleOffers as AllOfferType[]} activeOffer={pageOffer} city={pageOffer.city} />
      </section>
      <div className="container">
        <Places className="near-places" imgClassName="near-places__image-wrapper" listClassName="near-places__list" cardClassName="near-places__card" offers={nearOffers}>
          <h2 className="near-places__title" data-testid="nearby-title">
              Other places in the neighbourhood
          </h2>
        </Places>
      </div>
    </>
  );
};

export default OfferPage;
