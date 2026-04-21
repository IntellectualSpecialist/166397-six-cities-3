import { render, screen } from '@testing-library/react';
import LoginForm from './login-form';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    const signInText = 'Sign in';
    const emailText = 'E-mail';
    const passwordText = 'Password';
    const {withStoreComponent} = withStore(<LoginForm />);

    render(withStoreComponent);

    expect(screen.getByText(signInText)).toBeInTheDocument();
    expect(screen.getByLabelText(emailText)).toBeInTheDocument();
    expect(screen.getByLabelText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'email@test.com';
    const expectedPasswordValue = '123456';
    const {withStoreComponent} = withStore(<LoginForm />);

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
