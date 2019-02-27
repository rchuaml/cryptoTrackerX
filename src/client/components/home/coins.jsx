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
            <div class="card bg-primary text-white text-center active"><div class="card-body">
            <h1><i class="fa fa-money" aria-hidden="true" ></i> Coins</h1>
              </div></div>
                    <ol className = "list-group">
                        {this.state.list.map((listitem , index)=>{
                        return <li className = "list-group-item" >
                            <div class="container">
                              <div class="row">
                                <div class="col-sm">
                                <span>{index+1}.</span> <img src = {`https://s2.coinmarketcap.com/static/img/coins/32x32/${listitem.id}.png`}/>  {listitem.name} | {listitem.symbol}

                                </div>
                                <div class="col-sm">
                                    <strong>Current Price(USD)</strong>
                                </div>
                                <div class="col-sm">
                                    <strong>Total Marketcap(USD)</strong>
                                </div>
                                 <div class="col-sm">
                                    <strong>Circulating Supply</strong>
                                </div>
                                <div class="col-sm">
                            <button onClick = {() => {this.clickHandler(index)}} class = "btn btn-primary">Track this coin</button>
                                  </div>
                              </div>
                             <div class="row">
                                <div class="col-sm">
                                    % Change(1hr):<br/>
                                    {
                                    (listitem.quote.USD.percent_change_1h>=0) ?
                                    <span class = "text-success">{listitem.quote.USD.percent_change_1h} % </span>:
                                    <span class = "text-danger">{listitem.quote.USD.percent_change_1h} % </span>
                                    }
                                </div>
                                <div class="col-sm">
                                    $ {parseFloat(listitem.quote.USD.price).toFixed(6)}
                                </div>
                                <div class="col-sm">
                                    $ {parseFloat(listitem.quote.USD.market_cap).toFixed(2)}
                                </div>
                                 <div class="col-sm">
                                    {listitem.circulating_supply}
                                </div>
                                <div class="col-sm">
                                    <small>Last Updated: {moment(listitem.quote.USD.last_updated).format("DD/MM/YYYY, h:mm:ss a")}</small>
                                </div>
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