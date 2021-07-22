/* eslint-disable react/forbid-prop-types */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = (props) => {
  const { authenticationInfo } = props;
  return (
    <nav id="nav-bar">
      <Link to="/" className="nav-button">Home</Link>
      <Link to="/login" className="nav-button">Login</Link>
      <Link to="/signup" className="nav-button">Sign Up</Link>
      {
        authenticationInfo.authToken
        && <Link to={`/user/${authenticationInfo.userId}`} className="nav-button">User Info</Link>
      }
      {
        authenticationInfo.authToken
        && <Link to="/users" className="nav-button">Users Index</Link>
      }
    </nav>
  );
};

NavBar.propTypes = {
  authenticationInfo: PropTypes.object,
};

NavBar.defaultProps = {
  authenticationInfo: null,
};

export default NavBar;
