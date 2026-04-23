import { MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../utils/common';

type FavoriteButtonProps = {
  id: string;
  isFavorite: boolean;
  className: string;
  activeClassName: string;
  svgClassName: string;
  imgWidth?: number;
  imgHeight?: number;
  testid?: string;
}

const FavoriteButton = ({id, isFavorite, className, activeClassName, svgClassName, imgWidth, imgHeight, testid }: FavoriteButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [favStatus, setFavStatus] = useState(isFavorite);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const status = Number(!favStatus);

  const handleButtonClick = async (evt: MouseEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();

    if (!isAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    try {
      setIsDisabled(true);
      await dispatch(changeFavoriteStatusAction({ id, status })).unwrap();
      setFavStatus((prev) => !prev);
    } catch (error) {
      throw new Error('Ошибка сохранения/удаления избранного');
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <button
      onClick={(evt) => {
        handleButtonClick(evt);
      }}
      className={`${className} ${favStatus ? activeClassName : ''} button`}
      type="button"
      disabled={isDisabled}
      data-testid={testid}
    >
      <svg className={svgClassName} width={imgWidth || 31} height={imgHeight || 33}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default FavoriteButton;
