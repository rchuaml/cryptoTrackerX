import React from 'react';
import { hot } from 'react-hot-loader';

import Home from './components/home/home';
import Login from './components/login/login';
import Logout from './components/login/logout';
import Signup from './components/login/signup';
import Coins from './components/home/coins';
import Dashboard from './components/home/dashboard';


import {Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Navbar extends React.Component{
    constructor() {
    super();
  }


    render(){
return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div className="container">
    <Link className="navbar-brand" to="/">cryptoTrackerX</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home
                <span className="sr-only">(current)</span>
              </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/coins">Coins</Link>
        </li>
        {(cookies.get('loggedIn')!=="true") ?
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        : <div/>
        }
        <li className="nav-item">
          <Link className ="nav-link" to={(cookies.get('loggedIn')==="true")? "/logout" : "/login"}>{(cookies.get('loggedIn')==="true")? 'Logout' : 'Login'}</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}
}


class Footer extends React.Component{
    render(){

        return(
<footer className="page-footer font-small special-color-dark pt-2 bg-dark fixed-bottom">
<div className ="text-center text-light"><h4>Like what you see? Hire me</h4></div>
    <div className="container">

      <ul className="list-unstyled list-inline text-center">

        <li className="list-inline-item">
          <a className="btn-floating btn-gplus mx-1 mr-4" href="mailto:ronchuaml@gmail.com?subject=Hello%20Ronnie">
            <i className="fa fa-envelope fa-3x text-light"></i>
               </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-li mx-1 mr-4" href = "https://www.linkedin.com/in/ronniechua/" target = "_blank">
            <i className="fa fa-linkedin fa-3x text-light"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-dribbble mx-1 mr-4" href="https://github.com/rchuaml" target="_blank">
            <i className="fa fa-github fa-3x text-light"> </i>
          </a>
        </li>
      </ul>

    </div>

    <div className = "text-center">© 2019 Copyright:
      <a href="https://github.com/rchuaml" target="_blank"> Ronnie Chua</a>
    </div>

  </footer>
        );
    }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false,
    };
  }

    render() {
              return(
                <div>
                <Navbar/>
                  <main>
                  <Switch>
                    <Route
                      path='/login'
                      render={() => (
                      (cookies.get('loggedIn')!=="true") ? (
                           <Login/>
                      ) : (
                        <Redirect to= {{
                            pathname: '/',
                            state: { message: 'Already logged in!',
                                        type: 'danger'
                                    }
                             }}
                        />
                        )
                        )}
                    />
                    <Route
                      exact path='/'
                      render={() => (
                        <Home/>
                      )}
                    />
                    <Route
                      path='/coins'
                      render={() => (
                      (cookies.get('loggedIn')==="true") ? (
                           <Coins/>
                      ) : (
                        <Redirect to= {{
                            pathname: '/',
                            state: { message: 'You need to login before you can access that feature',
                                        type: 'danger'
                             }
                        }}
                        />
                        )
                        )}
                    />
                    <Route
                    path = '/signup'
                    render={() => (
                      (cookies.get('loggedIn')!=="true") ? (
                           <Signup/>
                      ) : (
                        <Redirect to= {{
                            pathname: '/',
                            state: { message: 'Please logout before signing up again',
                                        type: 'danger'
                             }
                        }}
                        />

                        )
                        )}/>

                    <Route
                      path='/dashboard'
                      render={() => (
                      (cookies.get('loggedIn')==="true") ? (
                           <Dashboard/>
                      ) : (
                        <Redirect to= {{
                            pathname: '/',
                            state: { message: 'You need to login before you can access that feature',
                                        type: 'danger'
                             }
                        }}
                        />
                        )
                        )}
                    />

                    <Route
                    path = '/logout'
                    component={Logout}/>
                    </Switch>
                  </main>
                <Footer/>
                </div>
              )

    }
}

export default hot(module)(App);