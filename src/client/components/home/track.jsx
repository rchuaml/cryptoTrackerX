import React from 'react';
const axios = require('axios');

class Track extends React.Component{
    constructor(){
        super();
        this.state = {
        list: [],
        price: "",
        quantity: "",
        message: "",
        sum: "",
        costs: "",
        buyarray: [],
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);

}



   componentDidMount() {
    console.log(" componentdiddymount run coin.jsx");
    var that = this;
    axios.get('/coin/track')
  .then(function (response) {
    that.setState({list:response.data});
  })
  .catch(function (error) {
    console.log(error);
  })

}

    componentWillReceiveProps() {
        console.log(" componentwillreceiveprops run coin.jsx");
        var that = this;
        axios.get('/coin/track')
      .then(function (response) {
        that.setState({list:response.data});
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    editHandler(index){
        if(this.state.price.length>0 && this.state.quantity.length>0){
        var that = this;
        axios.put('/coin/edit', {price : this.state.price, quantity : this.state.quantity, id : this.state.list[index].id})
          .then(function (response) {
            console.log(response);
            alertify.success("Successfully edited coin.");
            that.componentWillReceiveProps();
          })
          .catch(function (error) {
            console.log(error);
          })
        }else{
            alertify.error("Please check if both input boxes are filled!")
        }
    }

    deleteHandler(index){
        console.log("deleteHandler clicked");
        var that = this;
        var coinid = this.state.list[index].id;
        console.log(coinid);
        axios.delete('/coin/delete', {data:{id : coinid}})
      .then(function (response) {
        console.log(that.state.list);
        alertify.success("Successsfully deleted coin.");
        that.componentWillReceiveProps();
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    calculateTotal(){
        var that = this;
        axios.post('/coin/calculate', that.state.list)
        .then(function(response){
            var sum = 0;
            var arraysum = [];
            for(var i = 0 ; i < response.data.length; i++){
                sum += response.data[i];
                arraysum.push(response.data[i]/that.state.list[i].qty);
            }
             that.setState({sum: sum});
             that.setState({buyarray: arraysum});
        })
        .catch(function(error){
            console.log(error);
        })
         var costs = 0;
        for(var i = 0; i < that.state.list.length; i++){
            costs += (that.state.list[i].buyprice*that.state.list[i].qty);
        }
        document.getElementById("port").style =  "display:block";
        that.setState({costs: costs});
    }

    changePrice(event){
        console.log(event.target.value);
        this.setState({price: event.target.value});
    }

    changeQuantity(event){
        console.log(event.target.value);
        this.setState({quantity : event.target.value});
    }

    render(){
        var divstyle = {
            display: "none",
        };

        var red = {
            text: "red",
        };

        return(
            <div>

              <div class="card bg-primary active text-white"><div class="card-header text-center">
                <h1><i class="fa fa-tasks" aria-hidden="true"></i> Portfolio</h1></div>
                <div class = "card-body text-center text-dark" style={{"background-color" : "lightblue"}}>
              <button class = "btn btn-primary"onClick = {this.calculateTotal}>Calculate total</button><br/><div id = "port" style = {divstyle} ><h6>Total Value = USD$ {parseFloat(this.state.sum).toFixed(2)}</h6><h6>Total Costs = USD$ {this.state.costs}</h6>
                {(this.state.sum-this.state.costs<0) ? <h6 class = "text-danger"><strong>Losses = USD$ {parseFloat(this.state.sum-this.state.costs).toFixed(2)}<br/>Percentage Loss = {(parseFloat(this.state.sum/this.state.costs*100 - 100)).toFixed(2)} % </strong></h6> : <div class = "text-success"><h6><strong>Total Profits = USD$ +{parseFloat(this.state.sum-this.state.costs).toFixed(2)}</strong></h6><h6><strong>Percentage Profits = +{(parseFloat(this.state.sum/this.state.costs*100 - 100)).toFixed(2)} % </strong> </h6></div>}
              </div></div></div>
                <ol className = "list-group">
                        {this.state.list.map((listitem , index)=>{
                        return <li className = "list-group-item d-inline-block"><span>{index+1}.</span> <img src = {`https://s2.coinmarketcap.com/static/img/coins/32x32/${listitem.cmcid}.png`}/>
                            <span>
                                Name: {listitem.name}
                            </span>
                            <div className = "d-inline float-right">
                            <label class = "d-inline">Edit Quantity</label>
                            <label class = "d-inline">&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit Buy Price</label>
                            <br/>
                            <input placeholder = {listitem.qty} onChange = {() => {this.changeQuantity(event)}} />
                            <input placeholder = {listitem.buyprice} onChange = {() => {this.changePrice(event)}}/>
                            <button class= "btn btn-danger" onClick = {()=>{alertify.confirm('Are you sure you want to delete this coin?', ()=>{this.deleteHandler(index)} )}}>Delete</button>
                            <button class = "btn btn-info" style={{"width" : "72.89px"}} onClick = {()=>{alertify.confirm('Comfirm Edit?', ()=>{this.editHandler(index)} )}}>Edit</button>
                            </div>
                            <div class="d-inline">
                            <br/><span>Buy price: USD${parseFloat(listitem.buyprice).toFixed(2)}</span><br/>
                            <span>Quantity: {listitem.qty}</span><br/>
                            <span>Time Added: {moment(listitem.timestamp_coin).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                            <br/>
                            {(this.state.buyarray.length>0 & parseFloat(listitem.qty)>0) ?
                            (this.state.buyarray[index]-listitem.buyprice>=0) ?
                            <span class = "text-success">Current Price: USD$ {parseFloat(this.state.buyarray[index]).toFixed(2)}<br/>+ {parseFloat((this.state.buyarray[index]/listitem.buyprice)*100 - 100).toFixed(2)} % Profits</span>
                            : <span class = "text-danger"> Current Price: USD$ {parseFloat(this.state.buyarray[index]).toFixed(2)}<br/> {parseFloat((this.state.buyarray[index]/listitem.buyprice)*100 - 100).toFixed(2)} % Loss</span>
                            : <div></div>
                            }
                            </div>

                        </li>
                        })}
                    </ol>
                </div>
             );
    }
}

export default Track;