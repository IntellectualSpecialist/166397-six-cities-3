import { Helmet } from 'react-helmet-async';
import Header from '../../layout/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Страница не найдена</title>
      </Helmet>
      <Header />

      <main className="page__main">

        <div className='container'>
          <h1>404. Page not found</h1>
          <a href="/">Вернуться на главную</a>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
