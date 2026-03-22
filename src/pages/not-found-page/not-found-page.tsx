import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const NotFoundPage = (): JSX.Element => (
  <>
    <Helmet>
      <title>6 cities. Страница не найдена</title>
    </Helmet>
    <div className='container'>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </div>
  </>
);

export default NotFoundPage;
