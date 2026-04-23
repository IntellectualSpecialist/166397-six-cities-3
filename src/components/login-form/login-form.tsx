import { FormEventHandler, ReactEventHandler, useState } from 'react';
import { RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { selectRequestStatus } from '../../store/user-process/selectors';

type ChangeHandler = ReactEventHandler<HTMLInputElement>
type SubmitHandler = FormEventHandler<HTMLFormElement>

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState(
    {
      login: '',
      password: '',
    }
  );

  const handleFormDataChange: ChangeHandler = (evt) => {
    setFormData({
      ...formData,
      [evt.currentTarget.name !== 'email' ? evt.currentTarget.name : 'login']: evt.currentTarget.value,
    });
  };

  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(selectRequestStatus);
  const isAuthRequestLoading = requestStatus === RequestStatus.Loading;

  const handleFormSubmit: SubmitHandler = (evt) => {
    evt.preventDefault();
    if (isAuthRequestLoading) {
      return;
    }

    dispatch(loginAction(formData));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="email">E-mail</label>
        <input
          onChange={handleFormDataChange}
          value={formData.login} className="login__input form__input"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          data-testid="loginElement"
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="password">Password</label>
        <input
          onChange={handleFormDataChange}
          value={formData.password}
          className="login__input form__input"
          id="password" type="password"
          name="password"
          placeholder="Password"
          required
          data-testid="passwordElement"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$"
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
};

export default LoginForm;
