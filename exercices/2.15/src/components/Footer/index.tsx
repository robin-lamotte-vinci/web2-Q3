import "./Footer.css";

interface FooterProps {
  urlLogo: string;
  children?: React.ReactNode;
}

const Footer = (props: FooterProps) => {
  return (
    <div>
      <footer>
        <div>{props.children}</div>
        <img src={props.urlLogo} alt="logo" className="logo" />
      </footer>
    </div>
  );
};

export default Footer;
