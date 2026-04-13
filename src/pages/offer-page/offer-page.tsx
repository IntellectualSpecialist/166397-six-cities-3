import { Helmet } from 'react-helmet-async';
import Reviews from '../../components/reviews/reviews';
import Places from '../../components/places/places';
import ReviewForm from '../../components/review-form/review-form';
import { AuthorizationStatus, RequestStatus } from '../../const';
import Map from '../../components/map/map';
import { Navigate, useParams } from 'react-router-dom';
import { capitalizeValue, getRaitingPercentage } from '../../utils/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoriteButton from '../../ui/favorite-button/favorite-button';
import { useSelector } from 'react-redux';
import { fetchNearbyAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import { AllOffersType } from '../../types/all-offer-type';
import { selectNearby, selectOffer, selectOfferStatus } from '../../store/offer/selectors';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { selectReviews } from '../../store/reviews/selectors';
// import NotFoundPage from '../not-found-page/not-found-page';

const MAX_PHOTOS_COUNT = 6;
const MAX_NEARBY_COUNT = 3;

const OfferPage = (): JSX.Element => {
  const {id: offerId} = useParams();
  const dispatch = useAppDispatch();
  const pageOffer = useAppSelector(selectOffer);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const nearOffers = useAppSelector(selectNearby).slice(0, MAX_NEARBY_COUNT);
  const reviews = useAppSelector(selectReviews).toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const status = useAppSelector(selectOfferStatus);

  const visibleOffers = [...nearOffers, pageOffer];

  useEffect(() => {
    dispatch(fetchOfferAction(offerId as string));
    dispatch(fetchNearbyAction(offerId as string));
    dispatch(fetchReviewsAction(offerId as string));
  }, [offerId, dispatch]);

  if (status === RequestStatus.Loading) {
    return <LoadingPage/>;
  }

  if (status === RequestStatus.Failed || !pageOffer) {
    // return <NotFoundPage/>;
    return <Navigate to="/404" />;
  }

  const {id, type, title, price, goods, images, rating, description, host: {isPro, name, avatarUrl}, bedrooms, maxAdults, isPremium, isFavorite } = pageOffer;

  const isUserSignIn = authorizationStatus === AuthorizationStatus.Auth;
  const starsWidth = getRaitingPercentage(rating);

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
              <FavoriteButton id={id} isFavorite={isFavorite} className='offer__bookmark-button' activeClassName='offer__bookmark-button--active' svgClassName='offer__bookmark-icon' />
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
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{capitalizeValue(name)}</span>
                {isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
              </h2>
              {!!reviews?.length && <Reviews reviews={reviews} /> }
              {isUserSignIn && <ReviewForm id={pageOffer.id} />}
            </section>
          </div>
        </div>
        <Map className="offer__map" offers={visibleOffers as AllOffersType} activeOffer={pageOffer} city={pageOffer.city} />
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
