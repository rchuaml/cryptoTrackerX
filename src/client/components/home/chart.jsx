import React from 'react';
const axios = require('axios');
import Chart from 'chart.js';

class Charts extends React.Component{
    constructor(){
        super();
        this.state = {
        list: [],
        selected: "",
        dlist : [],
        plist : [],
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
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
        var that = this;
        axios.get('/coin/track')
      .then(function (response) {
        that.setState({list:response.data});
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    changeHandler(event){
          document.querySelector("#chartBox").innerHTML = '&nbsp;';
        var that = this;
        console.log(event.target.value);
        let selected = event.target.value;
        let selectedsym = this.state.list[selected].symbol;
        axios.post('/coin/chart', {sym: selectedsym})
        .then( function(response){
            console.log("AXIOSCALL");
            var plist = [];
            var dlist = [];
            for(let i = 0; i<response.data.length; i++){
                plist.push(response.data[i].close);
                dlist.push(moment.unix(response.data[i].time).format("DD-MM-YYYY"));
            }
            that.setState({dlist:dlist});
            that.setState({plist:plist});
            var palist = that.state.plist;
            var dalist = that.state.dlist;
            var listitemz = that.state.list[selected].name;
var config = {
            type: 'line',
            data: {
                labels: dalist,
                datasets: [{
                        label: "Price at date",
                        data: palist,
                        fill: false,
                        backgroundColor: "red ",
                        borderColor: "#39ff14",
                    }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                hover: {
                    mode: 'label'
                },
                scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Day'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: false,
                                max: Math.max(...that.state.plist),
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'USD$'
                            }

                        }]
                },
                title: {
                    display: true,
                    text: `${listitemz} Daily Chart`
                },
            }
        };
        document.querySelector("#chartBox").innerHTML = '<canvas id="myChart" ref = "canvas"> </canvas>';
        var ctx = document.getElementById("myChart").getContext("2d");
       var myChart = new Chart(ctx, config);

        })
        .catch(function(error){
            console.log(error);
        })
    }

    clickHandler(index){

    }
    render(){

        return(
            <div>
              <div className="card bg-primary active text-white"><div className="card-header text-center">
                <h1><i className="fa fa-line-chart" aria-hidden="true"></i> Charts</h1></div>
                <div className = "card-body text-center text-dark" style={{"background-color" : "lightblue"}}>
                    <select onChange = {this.changeHandler}>
                    <option selected="true" disabled="disabled"> Select a coin </option>
                    {
                        this.state.list.map((listitem , index)=>{
                    return <option value = {index}> {listitem.name} </option>
                        })
                    }
                 </select>
                {(this.state.list.length===0) ? <h6 className = "text-danger">Please add a coin before charting</h6> : <div/>}
                </div>
                </div>
                <div id = "chartBox">
                <canvas id="myChart" ref = "canvas"></canvas>
                </div>
                </div>
             );
    }
}

export default Charts;