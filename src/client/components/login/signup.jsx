import React from 'react';
import {Switch, Route, Link, Redirect } from "react-router-dom";
const axios = require('axios');
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Signup extends React.Component {

    constructor(){
      super()
      this.changeUser = this.changeUser.bind( this );
      this.changePass = this.changePass.bind( this );
      this.signupHandler = this.signupHandler.bind( this );
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

    signupHandler(){
        var that = this;
        axios.post('/user/signup', {
        username: this.state.username,
        password: this.state.password
      }).then(function (response) {
        if(response.data === "1"){
            document.getElementById("error").className = "alert alert-danger";
            that.setState({error:"Username already exists in our system, please try another username!"});
        }
        else if (response.data === "2"){
            cookies.set('loggedIn', 'true', { path: '/' });
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
   <h3>Sign up form</h3>
          <div className="form-group">
            <label className ="username mt-3 mb-4">Username</label>
            <input onChange = {this.changeUser} name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label className= "password mt-3 mb-4">Password</label>
            <input onChange = {this.changePass} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>

          <button type= "button" onClick = {this.signupHandler} className="btn btn-primary mt-3">Signup</button>
        </form>
        </div>
    );
}   else{
        return(
        <Redirect to= "/"/>
        )
  }
}
}

export default Signup;