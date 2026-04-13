import { Helmet } from 'react-helmet-async';
import Tab from '../../ui/tab/tab';
import { FormEventHandler, ReactEventHandler, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

type ChangeHandler = ReactEventHandler<HTMLInputElement>
type SubmitHandler = FormEventHandler<HTMLFormElement>

const LoginPage = (): JSX.Element => {
  const [formData, setFormData] = useState(
    {
      login: '',
      password: '',
    }
  );

  const handleFormDataChange: ChangeHandler = (evt) => {
    setFormData({
      ...formData,
      [evt.currentTarget.name]: evt.currentTarget.value,
    });
  };

  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler = (evt) => {
    evt.preventDefault();

    dispatch(loginAction(formData));
  };

  return (
    <>
      <Helmet>
        <title>6 cities. Страница входа</title>
      </Helmet>

      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="email">E-mail</label>
              <input onChange={handleFormDataChange} value={formData.login} className="login__input form__input" id="email" type="email" name="login" placeholder="Email" required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="password">Password</label>
              <input onChange={handleFormDataChange} value={formData.password} className="login__input form__input" id="password" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <Tab name='Amsterdam' />
        </section>
      </div>
    </>
  );
};

export default LoginPage;
