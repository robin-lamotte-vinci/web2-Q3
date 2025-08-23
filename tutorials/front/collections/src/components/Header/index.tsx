import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  version: number;
}

const Header = ({ title, version }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);
  const [versionPrinted, setVersionPrinted] = useState(false);

  const handleVersionClick = () => {
    setVersionPrinted(!versionPrinted);
  };

  return (
    <div>
      <header onClick={() => setMenuPrinted(!menuPrinted)}>
        <h1 className="animate__animated animate__bounce">
          {menuPrinted ? `${title}... and rarely do we hate it!` : title}
        </h1>
      </header>
      <h4 onClick={handleVersionClick}>
        {versionPrinted
          ? `Version= ${version}`
          : "Click for additionnal information"}
      </h4>
    </div>
  );
};

export default Header;
