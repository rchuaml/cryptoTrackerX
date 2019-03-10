import React from 'react';
const axios = require('axios');


class Coins extends React.Component{
    constructor(){
        super();
        this.state = {
        list: [],
    };
    }

    componentDidMount() {
    var that = this;
    axios.get('/user/all')
  .then(function (response) {
    that.setState({list:response.data});
  })
}

    componentWillReceiveProps() {
        var that = this;
        axios.get('/user/all')
      .then(function (response) {
        that.setState({list:response.data});
      })
    }


    render(){
        return(
                <div>
            <div className="card bg-primary text-white text-center active"><div className="card-header text-center">
            <h1><i className="fa fa-calendar" aria-hidden="true" ></i> Users List</h1>
              </div>
            <div className = "card-body text-center text-white" style={{"background-color" : "lightblue"}}>
                <h3>Total Number of Users: {this.state.list.length}</h3>
            </div>
                </div>
                        <ol className = "list-group">
                            {this.state.list.map((listitem , index)=>{
                            return <li className = "list-group-item" >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm border-right"><h6>{index+1}. &nbsp; Username: {listitem.username}</h6></div>
                                        <div className="col-sm "><h6>Date Created: {moment(listitem.timestamp_user).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h6></div>
                                    </div>
                                </div>
                            </li>
                            })}
                        </ol>
                </div>
             );
    }
}

export default Coins;