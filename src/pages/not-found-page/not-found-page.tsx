import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. Страница не найдена</title>
      </Helmet>
      <div className='container'>
        <h1>404. Page not found</h1>
        <a href="/">Вернуться на главную</a>
      </div>
    </>
  );
}

export default NotFoundPage;
