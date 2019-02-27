import React from 'react';
const axios = require('axios');


class Coins extends React.Component{
    constructor(){
        super();
        this.state = {
        list: [],
        message: "",
    };
    }

    componentDidMount() {
    console.log(" component did mount run coin.jsx");
    var that = this;
    axios.get('/coin/data')
  .then(function (response) {
    var datalist = JSON.parse(response.data).data;
    console.log("datalist", datalist);
    that.setState({list:datalist});
  })
  .catch(function (error) {
    console.log(error);
  })
}

    componentWillReceiveProps() {
    console.log("component did receiveprops run coin.jsx");
        var that = this;
        axios.get('/coin/data')
      .then(function (response) {
        var datalist = JSON.parse(response.data).data;
        console.log("datalist", datalist);
        that.setState({list:datalist});
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    clickHandler(index){
        var that = this;
        axios.post('/coin/add', that.state.list[index]
            )
          .then(function (response) {
            console.log(response);
            alertify.success("Successfully added coin!");
          })
          .catch(function (error) {
            console.log(error);
          });
}

    render(){
        console.log(this.state.list);
        return(
                <div>
                    <div id = "message">{this.state.message}</div>
                    <ol className = "list-group">
                        {this.state.list.map((listitem , index)=>{
                        return <li className = "list-group-item"><span>{index+1}.</span> <img src = {`https://s2.coinmarketcap.com/static/img/coins/32x32/${listitem.id}.png`}/>
                            <span>
                                {listitem.name} |
                            </span>
                            <span>USD${listitem.quote.USD.price}</span>
                            <button class = "float-right" onClick = {() => {this.clickHandler(index)}}>Track this coin</button>
                        </li>
                        })}
                    </ol>
                </div>
             );
    }
}

export default Coins;