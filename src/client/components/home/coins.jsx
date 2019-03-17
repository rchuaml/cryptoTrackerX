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
    var that = this;
    axios.get('/coin/data')
  .then(function (response) {
    var datalist = JSON.parse(response.data).data;
    that.setState({list:datalist});
  })
  .catch(function (error) {
    console.log(error);
  })
}

    componentWillReceiveProps() {
        var that = this;
        axios.get('/coin/data')
      .then(function (response) {
        var datalist = JSON.parse(response.data).data;
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
            alertify.success("Successfully added coin!");
          })
          .catch(function (error) {
            console.log(error);
          });
}

    render(){
        return(
                <div>
                    <div id = "message">{this.state.message}</div>
            <div className="card bg-primary text-white text-center active"><div className="card-body">
            <h1><i className="fa fa-money" aria-hidden="true" ></i> Coins</h1>
              </div></div>
                    <ol className = "list-group">
                        {this.state.list.map((listitem , index)=>{
                        return <li className = "list-group-item" >
                            <div className="container">
                              <div className="row">
                                <div className="col-sm col-md">
                                <span>{index+1}.</span> <img src = {`https://s2.coinmarketcap.com/static/img/coins/32x32/${listitem.id}.png`}/>  {listitem.name} | {listitem.symbol}

                                </div>
                                <div className="col-sm col-md">
                                    <strong>Current Price(USD)</strong>
                                </div>
                                <div className="col-sm col-md">
                                    <strong>Total Marketcap(USD)</strong>
                                </div>
                                 <div className="col-sm col-md">
                                    <strong>Circulating Supply</strong>
                                </div>
                                <div className="col-sm col-md">
                                <button onClick = {() => {this.clickHandler(index)}} className = "btn btn-primary">Track this coin</button>
                                  </div>
                              </div>
                             <div className="row">
                                <div className="col-sm col-md">
                                    % Change(1hr):<br/>
                                    {
                                    (listitem.quote.USD.percent_change_1h>=0) ?
                                    <span className = "text-success">{listitem.quote.USD.percent_change_1h} % </span>:
                                    <span className = "text-danger">{listitem.quote.USD.percent_change_1h} % </span>
                                    }
                                </div>
                                <div className="col-sm col-md">
                                    $ {parseFloat(listitem.quote.USD.price).toFixed(6)}
                                </div>
                                <div className="col-sm col-md">
                                    $ {parseFloat(listitem.quote.USD.market_cap).toFixed(2)}
                                </div>
                                 <div className="col-sm col-md">
                                    {listitem.circulating_supply}
                                </div>
                                <div className="col-sm col-md">
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