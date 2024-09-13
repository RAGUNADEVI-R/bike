import { ReactComponent as LogoDark } from "../assets/images/logos/bikelogo.svg";
import { Link } from "react-router-dom";

const Logo = ({ width, height }) => {
  return (
    <Link to="/">
      {/* <LogoDark style={{ width: '2000px', height: '100px', display: 'flex', margin: 'auto' }} /> */}
    </Link>
  );
};

export default Logo;
