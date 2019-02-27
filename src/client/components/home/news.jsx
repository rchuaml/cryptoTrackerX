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
    console.log("RESPONSE.DATA", response.data);
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

            <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">

              <div class="modal-dialog modal-xl">

                        <div class="modal-content">
                        <div class = "modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    <iframe width= "100%" height= "600px" src={this.state.url}>
                     </iframe>
                </div>
              </div>
            </div>



            <div class="card bg-warning text-white text-center"><div class="card-body">
            <h1><i class="fa fa-newspaper-o" aria-hidden="true" ></i> News Feed</h1>
              </div></div>
                <ul class = "list-group">
                {this.state.news.map((listitem , index)=>{
                return <li className = "list-group-item" onClick = {() => {this.clickHandler(listitem.url)}} data-toggle="modal" data-target=".bd-example-modal-xl">
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

        </div>
        )
    }
}
export default News;