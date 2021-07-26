/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-alert */
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Component } from 'react';

import './stylesheets/style.css';

import { NavBar } from './components/navBar';
import { Home } from './components/home';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { UserInfo } from './components/userInfo';
import { UsersIndex } from './components/usersIndex';
import { ActivityInticator } from './components/activityInticator';

import { loginRequest } from './modules/loginRequest';
import { userInfoRequest, usersIndexRequest } from './modules/userRequests';

class App extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(document.location.search.substring(1));
    const referralCode = params.get('referral_code');
    const apiParam = params.get('apiURL') || 'http://localhost:3000';
    // const apiParam = params.get('apiURL') || 'https://boiling-fjord-82978.herokuapp.com';
    this.state = {
      apiURL: apiParam,
      authenticationInfo: {},
      userInfo: {},
      usersIndex: [],
      referralTicket: referralCode,
      redirectToSignUp: referralCode != null,
      redirectToUser: false,
      redirectToUsersIndex: false,
      showActivityIndicator: false,
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
    this.loadUsersIndex = this.loadUsersIndex.bind(this);
    this.referralRequest = this.referralRequest.bind(this);
  }

  loginHandler(event) {
    event.preventDefault();
    this.setState({ showActivityIndicator: true });

    const { apiURL } = this.state;
    const form = event.currentTarget;
    loginRequest(form, apiURL, (results) => {
      if (results) {
        this.setState({
          authenticationInfo: results,
          showActivityIndicator: false,
        });
        const { authenticationInfo } = this.state;
        const { userId } = authenticationInfo;
        this.loadUserInfo(userId);
        return;
      }
      this.setState({ showActivityIndicator: false });
    });
  }

  loadUserInfo(userId) {
    // alert(`userId : ${userId}`);
    this.setState({ showActivityIndicator: true });
    const { authenticationInfo, apiURL } = this.state;
    const { authToken } = authenticationInfo;
    userInfoRequest(authToken, apiURL, userId, (results) => {
      if (results) {
        this.setState({
          userInfo: results,
          redirectToUser: true,
          showActivityIndicator: false,
        });
        return;
      }
      this.setState({ showActivityIndicator: false });
    });
  }

  loadUsersIndex() {
    this.setState({ showActivityIndicator: true });

    const { authenticationInfo, apiURL } = this.state;
    const { authToken } = authenticationInfo;
    usersIndexRequest(authToken, apiURL, (results) => {
      if (results) {
        this.setState({
          usersIndex: results,
          showActivityIndicator: false,
          redirectToUsersIndex: true,
        });
        return;
      }
      this.setState({ showActivityIndicator: false });
    });
  }

  render() {
    const {
      apiURL,
      authenticationInfo,
      userInfo,
      usersIndex,
      referralTicket,
      redirectToSignUp,
      redirectToUser,
      redirectToUsersIndex,
      showActivityIndicator,
    } = this.state;
    const activityInticator = showActivityIndicator ? <ActivityInticator apiURL={apiURL} /> : '';

    let signupRedirect = '';
    if (redirectToSignUp) {
      signupRedirect = <Redirect to="/signup" />;
      this.state.redirectToSignUp = false;
    }

    let userRedirect = '';
    if (redirectToUser) {
      const { userId } = authenticationInfo;
      userRedirect = <Redirect to={`/user/${userId}`} />;
      this.state.redirectToUser = false;
    }

    let usersIndexRedirect = '';
    if (redirectToUsersIndex) {
      usersIndexRedirect = <Redirect to="/users" />;
      this.state.redirectToUsersIndex = false;
    }

    return (
      <Router>
        { activityInticator }
        { signupRedirect }
        { userRedirect }
        { usersIndexRedirect }
        <NavBar
          authenticationInfo={authenticationInfo}
          loadUserInfo={this.loadUserInfo}
          loadUsersIndex={this.loadUsersIndex}
        />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/login">
              <Login apiURL={apiURL} loginHandler={this.loginHandler} />
            </Route>

            <Route path="/signup">
              <Signup referralTicket={referralTicket} />
            </Route>

            <Route path="/user/:id">
              <UserInfo
                userInfo={userInfo}
                authenticationInfo={authenticationInfo}
                loadUserInfo={this.loadUserInfo}
                referralRequest={this.referralRequest}
              />
            </Route>

            <Route path="/users">
              <UsersIndex
                usersIndex={usersIndex}
                loadUserInfo={this.loadUserInfo}
              />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
