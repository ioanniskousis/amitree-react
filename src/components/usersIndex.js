/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { Component } from 'react';
import PropTypes from 'prop-types';

export class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.tableRows = this.tableRows.bind(this);
  }

  tableRows() {
    const { usersIndex } = this.props;
    const { loadUserInfo } = this.props;
    return usersIndex.map((user) => (
      <tr className="trow" key={user.id} onClick={() => loadUserInfo(user.id)}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.referral_code}</td>
        <td>{user.credit}</td>
      </tr>
    ));
  }

  render() {
    const tableHeaders = (
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Referral Code</th>
        <th>Credit $</th>
      </tr>
    );
    return (
      <section id="users-index-section">
        <div className="table-container">

          <table>
            <thead>
              {tableHeaders}
            </thead>
            <tbody>
              {this.tableRows()}
            </tbody>
          </table>

        </div>
      </section>
    );
  }
}

UsersIndex.propTypes = {
  loadUserInfo: PropTypes.func,
  usersIndex: PropTypes.array,
};

UsersIndex.defaults = {
  loadUserInfo: null,
  usersIndex: [],
};

export default UsersIndex;
