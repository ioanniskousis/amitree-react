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

import { loginRequest } from './modules/loginRequest';

class App extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(document.location.search.substring(1));
    const referralCode = params.get('referral_code');
    const apiParam = params.get('apiURL') || 'http://localhost:3000';
    this.state = {
      apiURL: apiParam,
      authenticationInfo: {},
      referralTicket: referralCode,
      redirectToSignUp: referralCode != null,
      activityIndicator: false,
    };
    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler(event) {
    event.preventDefault();
    this.setState({ activityIndicator: true });

    const { apiURL } = this.state;
    const form = event.currentTarget;
    loginRequest(form, apiURL, (results) => {
      if (results) {
        alert(JSON.stringify(results));
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

  render() {
    const {
      apiURL,
      authenticationInfo,
      referralTicket,
      redirectToSignUp,
      activityIndicator,
    } = this.state;
    const signup = redirectToSignUp ? <Redirect to="/signup" /> : '';
    const activity = activityIndicator ? <div /> : '';

    return (
      <Router>
        { activity }
        { signup }
        <NavBar authenticationInfo={authenticationInfo} />
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
              <div />
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
