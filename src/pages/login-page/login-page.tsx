import { Helmet } from 'react-helmet-async';
import Tab from '../../components/tab/tab';
import LoginForm from '../../components/login-form/login-form';
import { CityName } from '../../const';
import { useMemo } from 'react';

const LoginPage = (): JSX.Element => {
  const randomCity = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * CityName.length);
    return CityName[randomIndex];
  }, []);

  return (
    <>
      <Helmet>
        <title>6 cities. Страница входа</title>
      </Helmet>

      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title" data-testid="sign-in">Sign in</h1>
          <LoginForm />
        </section>
        <section className="locations locations--login locations--current">
          <Tab name={randomCity} />
        </section>
      </div>
    </>
  );
};

export default LoginPage;
