import React from 'react';
import {Switch, Route, Link, Redirect } from "react-router-dom";
const axios = require('axios');
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends React.Component {

    constructor(){
      super()
      this.changeUser = this.changeUser.bind( this );
      this.changePass = this.changePass.bind( this );
      this.loginHandler = this.loginHandler.bind( this );
    }

    state = {
      username : "",
      password : "",
      error: "",
      redirect: false,
    }

    changeUser(event){
      this.setState({username:event.target.value});
    }

    changePass(event){
      this.setState({password:event.target.value});
    }

    loginHandler(){
        var that = this;
        var data =
        {"username" : this.state.username,
          "password": this.state.password
      }
        axios.post('/user/login', {
        username: this.state.username,
        password: this.state.password
      }).then(function (response) {
        if(response.data === "1"){
            document.getElementById("error").className = "alert alert-danger";
            that.setState({error:"Username doesnt exist, please try another username!"});
        }
        else if(response.data === "2"){
            document.getElementById("error").className = "alert alert-danger";
            that.setState({error:"Password is wrong, please try again"});
        }
        else{
            cookies.set('loggedIn', 'true', { path: '/' });
            cookies.set('userName', response.data, { path: '/' });
            that.setState({redirect: true});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  render() {
    if(this.state.redirect === false){
    return (
        <div>
    <div id = "error">
        {this.state.error}
    </div>
   <form className = "col-5">
   <h3>Login Form</h3>
          <div className="form-group">
            <label className ="username mt-3 mb-4">Username</label>
            <input onChange = {this.changeUser} name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label className= "password mt-3 mb-4">Password</label>
            <input onChange = {this.changePass} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label id="checklabel">Remember me</label><label className = "float-right">Dont have an account?<br/><Link to = "/signup"> Sign Up here</Link></label>
            </div>

          <button type= "button" onClick = {this.loginHandler} className="btn btn-primary">Login</button>
        </form>
        </div>
    );
} else{
    return(
        <Redirect to= {{
            pathname: '/',
            state: { message: 'Successfully logged in',
                        type: 'success'
             }
        }}
        />
        )
  }
}
}

export default Login;