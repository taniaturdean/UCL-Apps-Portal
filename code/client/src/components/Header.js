import NavBar from "../components/NavBar";
import NavBarPhone from "./NavBarPhone";
import LineComponent from "../components/LineComponent";
import "./Header.css";
import {Link} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isPhone = useMediaQuery({ minWidth: 0,maxWidth:450});
  const isLaptop = useMediaQuery({ minWidth: 451,maxWidth:1823});
  const isLargeMonitor = useMediaQuery({ minWidth: 1824,maxWidth: 2359 });
  const isLandscapeTablet = useMediaQuery({ minWidth: 2360 });

  const getClassName = (baseClassName) => {
    if (isPhone) return `${baseClassName}--phone`;
    if (isLargeMonitor) return `${baseClassName}--large-monitor`;
    if (isLaptop) return `${baseClassName}--laptop`;
    if (isLandscapeTablet) return `${baseClassName}--landscape-tablet`;
    return baseClassName;
  };

  return (
    <nav className="header">
      <Link to = "/">
      <img className={getClassName("image-2-icon")} alt="" src="../../public/image-2@2x.png" />
      </Link>
      {isPhone ? <NavBarPhone /> : <NavBar />}
      <LineComponent />
    </nav>
  );
};

export default Header;
