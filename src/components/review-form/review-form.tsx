import { Fragment, ReactEventHandler, useState } from 'react';

const MIN_REVIEW_LENGTH = 50;

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>

const raitingValues = [
  {
    value: 5,
    description: 'perfect'
  },
  {
    value: 4,
    description: 'good'
  },
  {
    value: 3,
    description: 'not bad'
  },
  {
    value: 2,
    description: 'badly'
  },
  {
    value: 1,
    description: 'terribly'
  }
];

function ReviewForm(): JSX.Element {
  const [userReview, setUserReview] = useState({rating: 0, review: ''});

  const handleRaitingChange: ChangeHandler = (evt) => {
    setUserReview({
      ...userReview,
      [evt.currentTarget.name]: evt.currentTarget.value
    });
  };

  // eslint-disable-next-line no-console
  console.log(userReview);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {raitingValues.map(({value, description}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleRaitingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={description}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        value={userReview.review}
        onChange={handleRaitingChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={userReview.review.length < MIN_REVIEW_LENGTH || userReview.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
