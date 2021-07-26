/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import gear from '../images/gear.png';

export function ActivityInticator(props) {
  const { apiURL } = props;
  const accMsg = `Accessing: ${apiURL}`;
  return (
    <div className="activity-indicator-container">
      <div>
        <img src={gear} alt="" className="activity-indicator" />
        <p>{accMsg}</p>
      </div>
    </div>
  );
}

ActivityInticator.propTypes = {
  apiURL: PropTypes.string,
};

ActivityInticator.defaults = {
  apiURL: null,
};

export default ActivityInticator;
