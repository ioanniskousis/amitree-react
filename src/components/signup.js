/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';

export function Signup(props) {
  const { referralTicket, signUpHandler } = props;
  return (
    <section id="signup-section">
      <div className="form-container">
        <form id="signupForm" method="POST" encType="multipart/form-data" onSubmit={(e) => signUpHandler(e)}>
          <div className="input-container">
            <label htmlFor="name">
              Name
            </label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="input-container">
            <label htmlFor="email">
              Email
            </label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="input-container">
            <label htmlFor="password">
              Password
            </label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="input-container">
            <label htmlFor="password_confirmation">
              Password confirmation
            </label>
            <input type="password" name="password_confirmation" id="password_confirmation" />
          </div>
          <div className="input-container">
            <label htmlFor="referral_code">
              Referral Code
              <span> (use a valid referral code to gain $10 credit)</span>
            </label>
            <input type="text" name="referral_code" id="referral_code" defaultValue={referralTicket} />
          </div>
          <div className="input-container">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </section>
  );
}

Signup.propTypes = {
  signUpHandler: PropTypes.func,
  referralTicket: PropTypes.string,
};

Signup.defaultProps = {
  signUpHandler: null,
  referralTicket: null,
};

export default Signup;
