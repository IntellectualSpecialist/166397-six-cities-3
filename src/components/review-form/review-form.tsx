import { Fragment, ReactEventHandler, useState } from 'react';
import { ReviewLength } from '../../const';
import { useAppDispatch } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import { NewReview } from '../../types/review-type';

type ReviewFormProps = {
  id: string;
}
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

const ReviewForm = ({id}: ReviewFormProps): JSX.Element => {
  const [formData, setFormData] = useState<NewReview>({rating: 0, review: ''});
  const dispatch = useAppDispatch();

  const isButtonDisabled = formData.review.length < ReviewLength.Min || formData.review.length >= ReviewLength.Max || formData.rating === 0;

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    await dispatch(sendReviewAction({id, formData}));

    try {
      await dispatch(sendReviewAction({ id, formData })).unwrap();
      setFormData({ rating: 0, review: '' });
    } catch (error) {
      throw new Error('Ошибка отправки отзыва');
    }
  };

  const handleFormDataChange: ChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;

    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => {
      handleFormSubmit(evt);
    }}
    >
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
              onChange={handleFormDataChange}
              checked={value === Number(formData.rating)}
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
        value={formData.review}
        onChange={handleFormDataChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
