import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Component } from 'react';

import './stylesheets/style.css';

import { NavBar } from './components/navBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // apiURL: '',
      authenticationInfo: {

      },
      // referralTicket: null,
      // activityIndicator: false,
    };
  }

  render() {
    const { authenticationInfo } = this.state;
    return (
      <Router>
        <NavBar authenticationInfo={authenticationInfo} />
        <main className="App">
          <Switch>
            <Route exact path="/">
              <div />
            </Route>

            <Route path="/login">
              <div />
            </Route>

            <Route path="/signup">
              <div />
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
