/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import { Component } from 'react';
import PropTypes from 'prop-types';

export class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.invitedUsersTable = this.invitedUsersTable.bind(this);
  }

  invitedUsersTable() {
    const { userInfo } = this.props;
    const {
      invitedUsers,
    } = userInfo;
    const { loadUserInfo } = this.props;

    if (invitedUsers.length === 0) {
      return (
        <label>none</label>
      );
    }

    const tableHeaders = (
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Credit</th>
      </tr>
    );

    const tableRows = invitedUsers.map((user) => (
      <tr className="trow" key={user.id} onClick={() => loadUserInfo(user.id)}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.credit}</td>
      </tr>
    ));

    const table = (
      <table>
        <tbody>
          {tableHeaders}
          {tableRows}
        </tbody>
      </table>
    );

    return table;
  }

  render() {
    const {
      authenticationInfo,
      userInfo,
      referralRequest,
      loadUserInfo,
    } = this.props;
    const {
      id,
      name,
      email,
      credit,
      inviter,
      referralCode,
      invitedUsers,
    } = userInfo;
    const inviterName = inviter ? inviter.name : '';

    const referralButton = (
      authenticationInfo.userId === id ? (
        <div className="input-container">
          <button onClick={(e) => referralRequest(e)} type="button">
            Create Referral Code
          </button>
        </div>
      ) : '');

    return (
      <section id="user-section">
        <div className="table-container">
          <div className="input-container">
            <label>User Name</label>
            <p>{name}</p>
          </div>

          <div className="input-container">
            <label>User Email</label>
            <p>{email}</p>
          </div>

          <div className="input-container">
            <label>Credit $</label>
            <p>{credit}</p>
          </div>

          {
            inviter ? (
              <div className="input-container">
                <label>Inviter</label>
                <p className="cursor-pointer" onClick={() => loadUserInfo(inviter.id)}>{inviterName}</p>
              </div>
            ) : ''
          }

          <div className="input-container">
            <label>Referral Code</label>
            <p>{referralCode || 'not created'}</p>
          </div>

          {
            referralCode ? '' : referralButton
          }

          {
            referralCode ? (
              <div className="input-container">
                <label>
                  Registered Invited Users
                  <span>
                    (
                    {invitedUsers.length}
                    )
                  </span>
                </label>
                <div id="selected_user_invited_users">
                  {this.invitedUsersTable()}
                </div>
              </div>
            ) : ''
          }
        </div>
      </section>
    );
  }
}

UserInfo.propTypes = {
  authenticationInfo: PropTypes.object,
  userInfo: PropTypes.object,
  referralRequest: PropTypes.func,
  loadUserInfo: PropTypes.func,
};

UserInfo.defaultProps = {
  authenticationInfo: null,
  userInfo: null,
  referralRequest: null,
  loadUserInfo: null,
};

export default UserInfo;
