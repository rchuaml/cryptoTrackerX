import React from 'react';
import Cookies from 'universal-cookie';
import Home from '../home/home';
import {Switch, Route, Link, Redirect } from "react-router-dom";

const cookies = new Cookies();

class Logout extends React.Component{
     constructor() {
    super();
    this.state = {
    };
  }


    render(){
    if(cookies.get('loggedIn')==="true"){
        cookies.remove('loggedIn', { path: '/' });
        cookies.remove('userName', { path: '/' });
        return(
        <Redirect to= {{
            pathname: '/',
            state: { message: 'Successfully logged out',
                        type: 'success'
             }
        }}
        />
            );
        }   else   {
                return(
                    <Redirect to= {{
                        pathname: '/',
                        state: { message: 'Already logged out',
                                    type: 'danger'
                         }
                    }}
                    />
                    )
            }
        }
    }

export default Logout;