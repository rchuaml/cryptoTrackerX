import React from 'react';
const axios = require('axios');


class Track extends React.Component{
    constructor(){
        super();
        this.state = {
        list: [],
        price: "",
        quantity: "",
        message: ""
    };
    this.deleteHandler = this.deleteHandler.bind(this);

}



   componentDidMount() {
    console.log(" component did mount run coin.jsx");
    var that = this;
    axios.get('/coin/track')
  .then(function (response) {
    that.setState({list: response.data});
  })
  .catch(function (error) {
    console.log(error);
  })
}

    componentWillReceiveProps() {
    console.log("component did receiveprops run coin.jsx");
        var that = this;
        axios.get('/coin/track')
      .then(function (response) {
        that.setState({list: response.data});
        var array = [];
        for(var i = 0; i < response.data.length; i++){
            array.push(response.data[i].symbol);
        }

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
            that.componentDidMount();
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
        that.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
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
        console.log("rerender happen");
        return(
            <div>
            <div id = "message">
                {this.state.message}
                  <button id = "close-button" type="button" class="close" data-dismiss="alert" aria-label="Close" >
              </button>
            </div>
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
                            <button onClick = {()=>{alertify.confirm('Are you sure you want to delete this coin?', ()=>{this.deleteHandler(index)} )}}>Delete</button>
                            <button onClick = {()=>{alertify.confirm('Comfirm Edit?', ()=>{this.deleteHandler(index)} )}}>Edit</button>
                            </div>
                            <div class="d-inline">
                            <br/><span>Buy price: USD${listitem.buyprice}</span><br/>
                            <span>Quantity: {listitem.qty}</span><br/>
                            <span>Time Added: {moment(listitem.timestamp_coin).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>

                            </div>

                        </li>
                        })}
                    </ol>
                </div>
             );
    }
}

export default Track;