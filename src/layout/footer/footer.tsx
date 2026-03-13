import Logo from '../../ui/logo/logo';

function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Logo
        className="footer__logo-link"
        imgClassName="footer__logo"
        width={64}
        height={33}
      />
    </footer>
  );
}

export default Footer;
