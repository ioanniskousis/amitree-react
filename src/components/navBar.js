/* eslint-disable react/forbid-prop-types */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = (props) => {
  const { authenticationInfo, loadUserInfo, loadUsersIndex } = props;
  return (
    <nav id="nav-bar">
      <Link to="/" className="nav-button">Home</Link>
      <Link to="/login" className="nav-button">Login</Link>
      <Link to="/signup" className="nav-button">Sign Up</Link>
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
        && (
          <button
            type="button"
            className="nav-button"
            onClick={() => loadUsersIndex()}
          >
            Users Index
          </button>
        )
      }
    </nav>
  );
};

NavBar.propTypes = {
  authenticationInfo: PropTypes.object,
  loadUserInfo: PropTypes.func,
  loadUsersIndex: PropTypes.func,
};

NavBar.defaultProps = {
  authenticationInfo: null,
  loadUserInfo: null,
  loadUsersIndex: null,
};

export default NavBar;
