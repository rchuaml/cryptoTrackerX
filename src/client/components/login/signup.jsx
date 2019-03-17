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
        if (this.state.password.length===0 && this.state.username.length ===0){
            document.getElementById("error").className = "alert alert-danger";
            this.setState({error: "Please fill in both input fields!"});
        }

        else if (this.state.password.length<8){
            document.getElementById("error").className = "alert alert-danger";
            this.setState({error: "Password length too short(minimum 8 characters)"});
        }else if (this.state.username.length<6){
            this.setState({error: "Username length too short(minimum 6 characters)"});
        }
        else{
            var that = this;
            var correctuser = this.state.username;
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
                cookies.set('userName', correctuser, { path: '/' });
                that.setState({redirect: true});
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
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
                            <h3><i class="fa fa-user-plus"></i> &nbsp; Sign Up</h3>
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

                                <div class="form-group">
                      <button type= "button" onClick = {this.signupHandler} className="btn btn-primary">Sign Up</button>
                      </div>
                            </form>
                        </div>
                        <div class="card-footer" style={{"width" : "303px"}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   else{
        return(
        <Redirect to= {{
            pathname: '/',
            state: { message: 'Successfully signed up',
                        type: 'success'
             }
        }}
        />
    )
  }
}
}

export default Signup;