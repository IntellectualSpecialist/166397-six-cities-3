import { Helmet } from 'react-helmet-async';
import Tab from '../../ui/tab/tab';
import LoginForm from '../../components/login-form/login-form';

const LoginPage = (): JSX.Element => (
  <>
    <Helmet>
      <title>6 cities. Страница входа</title>
    </Helmet>

    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <LoginForm />
      </section>
      <section className="locations locations--login locations--current">
        <Tab name='Amsterdam' />
      </section>
    </div>
  </>
);

export default LoginPage;
