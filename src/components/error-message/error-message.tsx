import { useAppSelector } from '../../hooks';
import { selectError } from '../../store/selectors';
import './error-message.module.scss';

const ErrorMessage = (): JSX.Element | null => {
  const error = useAppSelector(selectError);

  return (error) ? <div className="error-message">{error}</div> : null;
};

export default ErrorMessage;
