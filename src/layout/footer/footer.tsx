import Logo from '../../ui/logo/logo';

const Footer = (): JSX.Element => (
  <footer className="footer container">
    <Logo
      className="footer__logo-link"
      imgClassName="footer__logo"
      width={64}
      height={33}
    />
  </footer>
);

export default Footer;
