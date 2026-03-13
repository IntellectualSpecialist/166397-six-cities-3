import { Outlet } from 'react-router-dom';
import Header from '../header/header';

type PageWrapperProps = {
  pageClassName?: string;
  mainClassName?: string;
}

function PageWrapper({pageClassName, mainClassName}: PageWrapperProps): JSX.Element {
  return (
    <div className={`page ${pageClassName}`}>
      <Header />

      <main className={`page__main ${mainClassName}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default PageWrapper;
