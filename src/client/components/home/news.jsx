import React from 'react';
const axios = require('axios');

class News extends React.Component{
    constructor(){
        super();
        this.state = {
        selected : "",
        list : [],
        news : []
        }
    }


    componentDidMount() {
    var that = this;
    var datalist = [];
    var newarr = [];
    axios.get('/coin/track')
  .then(function (response) {
    var counter = 0;
    var list = [];
    for(let i = 0; i<response.data.length; i++){
        list.push(response.data[i].symbol)
    }

    axios.post('/coin/news', {list})
  .then(function (response) {
    console.log("RESPONSE.DATA", response.data);
    that.setState({news: response.data});
  })
})

}

        render(){
        var divstyle = {
            display: "none",
        };


        return (
            <div>
            <div class="card bg-warning text-white text-center"><div class="card-body">
            <h1><i class="fa fa-newspaper-o" aria-hidden="true" ></i> News Feed</h1>
              </div></div>
                <ul class = "list-group">
                {this.state.news.map((listitem , index)=>{
                return <li className = "list-group-item">
                <div class = "row">
                <div class = "col-sm-3">
                <img src = {listitem.imageurl} width= "95%" height= "95%"/>
                </div>
                <div class = "col-sm-9">
                <h4>{listitem.title}</h4>
                <p >{listitem.body}</p>
                </div>
                </div>
            </li>
            })}
            </ul>
            <div style = {divstyle}>
            <iframe width= "100%" height= "550px" src="">
            </iframe>
            </div>
        </div>
        )
    }
}
export default News;