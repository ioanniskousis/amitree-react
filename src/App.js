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
import { ActivityInticator } from './components/activityInticator';

import { loginRequest } from './modules/loginRequest';
import { userInfoRequest } from './modules/userRequests';

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
      referralTicket: referralCode,
      redirectToSignUp: referralCode != null,
      redirectToUser: false,
      activityIndicator: false,
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
  }

  loginHandler(event) {
    event.preventDefault();
    this.setState({ activityIndicator: true });

    const { apiURL } = this.state;
    const form = event.currentTarget;
    loginRequest(form, apiURL, (results) => {
      if (results) {
        this.setState({
          authenticationInfo: results,
          activityIndicator: false,
        });
        const { authenticationInfo } = this.state;
        const { userId } = authenticationInfo;
        this.loadUserInfo(userId);
        return;
      }
      this.setState({ activityIndicator: false });
    });
  }

  loadUserInfo(userId) {
    // alert(`userId : ${userId}`);
    this.setState({ activityIndicator: true });
    const { authenticationInfo, apiURL } = this.state;
    const { authToken } = authenticationInfo;
    userInfoRequest(authToken, apiURL, userId, (results) => {
      if (results) {
        this.setState({
          userInfo: results,
          // currentView: 'user-info',
          redirectToUser: true,
          activityIndicator: false,
        });
        return;
      }
      this.setState({ activityIndicator: false });
    });
  }

  render() {
    const {
      apiURL,
      authenticationInfo,
      userInfo,
      referralTicket,
      redirectToSignUp,
      redirectToUser,
      activityIndicator,
    } = this.state;
    const signup = redirectToSignUp ? <Redirect to="/signup" /> : '';
    const activity = activityIndicator ? <ActivityInticator show={activityIndicator} apiURL={apiURL} /> : '';
    let redirectToUserInfo = '';
    if (redirectToUser) {
      const { userId } = authenticationInfo;
      redirectToUserInfo = <Redirect to={`/user/${userId}`} />;
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.redirectToUser = false;
    }

    return (
      <Router>
        { activity }
        { signup }
        { redirectToUserInfo }
        <NavBar authenticationInfo={authenticationInfo} loadUserInfo={this.loadUserInfo} />
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
              />
            </Route>

            <Route path="/users">
              <div />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
