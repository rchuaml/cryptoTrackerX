import React from 'react';
import Coins from './coins';
import Track from './track';
import News from './news';
import Homecss from '../../styles/home.scss';

class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
        selected : "",
    }
    this.homeClick = this.homeClick.bind(this);
    this.trackClick = this.trackClick.bind(this);
    this.coinHandler = this.coinHandler.bind(this);
    this.newsClick = this.newsClick.bind(this);
}

homeClick(){
    this.setState({selected:"home"});
}

//NANI NOT WORKING???? coin handler
coinHandler(){
    console.log("run");
    this.setState({selected:"coin"});
}

trackClick(){
    this.setState({selected:"track"});
}

newsClick(){
    this.setState({selected:"news"});
}

    render(){
        var selected = <Coins/>
        if(this.state.selected === ""){
            selected = <Coins/>
        }else if(this.state.selected === "track"){
            selected = <Track/>
        }else if(this.state.selected === "news"){
            selected = <News/>
        }
    return (
                <div>
                    <div class="row">
                        <div class="col-3">
                            <ul class = "list-group">
                                <li class=" list-group-item active"><h4 class="hidden-xs hidden-sm text-dark">Menu</h4></li>
                                <li onClick = {this.homeClick} class="list-group-item-primary list-group-item" id = "lol"><i class="fa fa-home" aria-hidden="true"></i><span class="hidden-xs hidden-sm "></span>   Home</li>
                                <li onClick = {this.coinHandler} class = "list-group-item list-group-item-primary"><i class="fa fa-tasks" aria-hidden="true"></i><span class="hidden-xs hidden-sm">   Coins</span></li>
                                <li onClick = {this.trackClick} class = "list-group-item list-group-item-primary"><i class="fa fa-bar-chart" aria-hidden="true"></i><span class="hidden-xs hidden-sm">   Tracking List</span></li>
                                <li onClick = {this.newsClick} class = "list-group-item list-group-item-primary"><i class="fa fa-newspaper-o" aria-hidden="true" ></i><span class="hidden-xs hidden-sm"> News </span></li>
                                <li class = "list-group-item list-group-item-primary"><i class="fa fa-calendar" aria-hidden="true"></i><span class="hidden-xs hidden-sm">   Users</span></li>
                                <li class = "list-group-item list-group-item-primary"><i class="fa fa-cog" aria-hidden="true"></i><span class="hidden-xs hidden-sm">   Setting</span></li>
                            </ul>
                        </div>
                        <div class="col-9">
                        {selected}
                        </div>
                    </div>
                </div>

        );
    }
}

export default Dashboard;