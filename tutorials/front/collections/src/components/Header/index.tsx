import "./Header.css"

interface HeaderProps {
  title: string;
  version: number;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
    </header>
  );
};

export default Header;