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
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fa fa-lock"></i> &nbsp; Sign In</h3>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                       <input onChange = {this.changeUser} name="username" type="text" className="form-control" placeholder="Enter username" required />
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                                    </div>
                        <input onChange = {this.changePass} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                                </div>
                                <div class="row align-items-center remember">
                                    <input type="checkbox" className = "ml-3"/>Remember Me
                                </div>
                                <div class="form-group">
                      <button type= "button" onClick = {this.loginHandler} className="btn btn-primary">Login</button>
                      </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-center links">
                                Don't have an account?<Link style={{"color" : "lightblue"}} to = "/signup"> Sign Up here</Link>
                            </div>
                            <div class="d-flex justify-content-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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