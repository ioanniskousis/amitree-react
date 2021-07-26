/* eslint-disable react/forbid-prop-types */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = (props) => {
  const { authenticationInfo, loadUserInfo } = props;
  return (
    <nav id="nav-bar">
      <Link to="/" className="nav-button">Home</Link>
      <Link to="/login" className="nav-button">Login</Link>
      <Link to="/signup" className="nav-button">Sign Up</Link>
      {/* {
        authenticationInfo.authToken
        && <Link to={`/user/${authenticationInfo.userId}`} className="nav-button">User Info</Link>
      } */}
      {
        authenticationInfo.authToken
        && (
          <button
            type="button"
            className="nav-button"
            onClick={() => loadUserInfo(authenticationInfo.userId)}
          >
            User Info
          </button>
        )
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
  loadUserInfo: PropTypes.func,
};

NavBar.defaultProps = {
  authenticationInfo: null,
  loadUserInfo: null,
};

export default NavBar;
