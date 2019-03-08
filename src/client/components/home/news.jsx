import React from 'react';
const axios = require('axios');

class News extends React.Component{
    constructor(){
        super();
        this.state = {
            selected : "",
            list : [],
            news : [],
            url : ""
        }
        this.clickHandler = this.clickHandler.bind(this);
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
                that.setState({news: response.data});
            })
        })

    }

    componentWillReceiveProps() {
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
                that.setState({news: response.data});
            })
        })

    }

    clickHandler(link){
        this.setState({url: link});
    }

render(){
        var divstyle = {
            display: "none",
        };


        return (
            <div>
                <div className="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className = "modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        <iframe width= "100%" height= "600px" src={this.state.url}>
                        </iframe>
                        </div>
                    </div>
                </div>



            <div className="card bg-primary text-white text-center"><div className="card-body">
                <h1><i className="fa fa-newspaper-o" aria-hidden="true" ></i> News Feed</h1>
            </div></div>
                <ul className = "list-group">
            {this.state.news.map((listitem , index)=>{
                return <li className = "list-group-item" onClick = {() => {this.clickHandler(listitem.url)}} data-toggle="modal" data-target=".bd-example-modal-xl">
                        <div className = "row">
                            <div className = "col-sm-3">
                                 <img src = {listitem.imageurl} width= "95%" height= "95%"/>
                            </div>
                            <div className = "col-sm-9">
                            <h4>{listitem.title}</h4>
                            <p >{listitem.body}</p>
                            </div>
                        </div>
                    </li>
                  })}
                </ul>
            </div>
         )
    }
}
export default News;