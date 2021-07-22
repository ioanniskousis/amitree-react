import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Component } from 'react';

import './stylesheets/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: '',
      authenticationInfo: {},
      referralTicket: null,
      activityIndicator: false,
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">

            </Route>

            <Route path="/login">

            </Route>

            <Route path="/signup">

            </Route>

            <Route path="/user/:id">

            </Route>

            <Route path="/users">

            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
