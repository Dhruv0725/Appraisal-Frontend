import { header } from "../../../portfolio";

import "./Header.css";

const Header = () => {
  const { homepage, title } = header;

  return (
    <header className="header center">
      <h3>
        {homepage ? (
          <a href={"https://www.beehyv.com/"} className="link">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
    </header>
  );
};

export default Header;
