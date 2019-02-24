import React from 'react';
import Cookies from 'universal-cookie';
import Home from '../home/home';
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
        return(
            <div>
            <div class="alert alert-success" role="alert">
            Successfully Logged Out
            </div>
              <Home />
            </div>
            );
        }   else   {
                return(
                    <div>
                    <div class="alert alert-danger" role="alert">
                    Already Logged Out
                    </div>
                    <Home/>
                </div>
                    )
            }
        }
    }

export default Logout;