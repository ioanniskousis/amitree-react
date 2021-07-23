import PropTypes from 'prop-types';

export function Login(props) {
  return (
    <section id="login-section">
      <div className="form-container">
        <form id="loginForm" method="POST" encType="multipart/form-data" onSubmit={(e) => props.loginHandler(e)}>
          <div className="input-container">
            <label htmlFor="email">
              Email
              <input type="email" name="email" id="email" />
            </label>
          </div>

          <div className="input-container">
            <label htmlFor="password">
              Password
              <input type="password" name="password" id="password" />
            </label>
          </div>

          <div className="input-container">
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </section>
  );
}

Login.propTypes = {
  loginHandler: PropTypes.func,
};

Login.defaultProps = {
  loginHandler: null,
};

export default Login;
