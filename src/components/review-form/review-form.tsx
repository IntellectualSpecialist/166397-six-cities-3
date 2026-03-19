import { Fragment, ReactEventHandler, FormEventHandler, useState } from 'react';
import { NewReview } from '../../types/review-type';

const MIN_REVIEW_LENGTH = 50;

type ReviewFormProps = {
  onSubmit: (review: NewReview) => void;
}

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>
type SubmitHandler = FormEventHandler<HTMLFormElement>

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

function ReviewForm({onSubmit}: ReviewFormProps): JSX.Element {
  const [userReview, setUserReview] = useState({rating: 0, review: ''});

  const handleFormSubmit: SubmitHandler = (evt) => {
    evt.preventDefault();
    onSubmit(userReview);
    setUserReview({rating: 0, review: ''});
  };

  const handleRaitingChange: ChangeHandler = (evt) => {
    setUserReview({
      ...userReview,
      [evt.currentTarget.name]: evt.currentTarget.value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
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
              checked={value === Number(userReview.rating)}
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
