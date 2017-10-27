import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import cookie from 'react-cookies'
// import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Login from './Screens/Login'
import Schoolchildren from './Screens/Schoolchildren'
import Classes from './Screens/Classes'
import Teachers from './Screens/Teachers'





class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      login: false,
      key: 0,
    }
  }

  componentWillMount() {
    this.getKeyFromCookies()
  }

  render() {
    if (this.state.login) {
      return (
        <Router>
          <div className="App">
            {this.state.login ? '' : <Login setKey={this.getKeyFromServer.bind(this)} />}
            <ul className={'nav'}>
              <li><OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Schoolchildren" /></li>
              <li><OldSchoolMenuLink to="/classes" label="Classes" /></li>
              <li><OldSchoolMenuLink to="/teachers" label="Teachers" /></li> 
            </ul>
            <Route path="/" exact render={(props) => (<Schoolchildren serverKey={this.state.key} />)} />
            <Route path="/classes" exact render={(props) => (<Classes serverKey={this.state.key} />)} />
            <Route path="/teachers" exact render={(props) => (<Teachers serverKey={this.state.key} />)} />
          </div>
        </Router>
      );
    }
    else {
      return (
        <Router>
          <div className="App">
            {this.state.login ? '' : <Login setKey={this.getKeyFromServer.bind(this)} />}
          </div>
        </Router>
      );
    }

  }


  getKeyFromServer(key) {
    this.setState({
      key,
      login: true
    })
    this.setKeyToCookies(key)
  }

  getKeyFromCookies() {
    if (cookie.load('key')) {
      this.setState({
        key: cookie.load('key'),
        login: true
      })
    }
  }

  setKeyToCookies(key) {
    cookie.save('key', key)
  }

}

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match, props }) => (
    <Link {...props} className={match ? 'active' : ''} to={to}>{label}</Link>
  )} />
)

export default App;