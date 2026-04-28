import { createMemoryHistory, MemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';

export const renderWithHistory = (component: JSX.Element, history?: MemoryHistory) => {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
};
