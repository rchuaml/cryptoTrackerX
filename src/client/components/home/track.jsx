import React from 'react';
const axios = require('axios');


class Track extends React.Component{
    constructor(){
        super();
        this.state = {
        list: [],
    };
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
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    clickHandler(){

    }

    render(){
        console.log(this.state.list);
        return(
                <ol className = "list-group">
                        {this.state.list.map((listitem , index)=>{
                        return <li className = "list-group-item"><span>{index+1}.</span> <img src = {`https://s2.coinmarketcap.com/static/img/coins/32x32/${listitem.cmcid}.png`}/>
                            <span>
                                Name: {listitem.name} |
                            </span>
                            <span>Buy price: USD${listitem.buyprice}  |</span>
                            <span>Quantity: {listitem.qty}</span>
                            <input class = "float-right" placeholder = "Edit Buy Price"/>
                            <input class = "float-right" placeholder = "Edit Quantity"/>
                            <button class = "float-right" onClick = {() => {this.clickHandler(index)}}>Edit</button>
                            <button class = "float-right" onClick = {() => {this.clickHandler(index)}}>Delete</button>
                        </li>
                        })}
                    </ol>
             );
    }
}

export default Track;