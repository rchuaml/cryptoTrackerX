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

coinHandler(){
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
                    <div className="row">
                        <div className="col-3">
                            <div className = "position-fixed">
                                <ul className = "list-group " style={{"width" : "350px"}}>
                                    <li className=" list-group-item active" ><h4 className="hidden-xs hidden-sm text-light">Menu</h4></li>
                                    <li onClick = {this.homeClick} className="list-group-item-primary list-group-item" id = "lol"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm "></span>   Home</li>
                                    <li onClick = {this.coinHandler} className = "list-group-item list-group-item-primary"><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Coins</span></li>
                                    <li onClick = {this.trackClick} className = "list-group-item list-group-item-primary"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Tracking List</span></li>
                                    <li onClick = {this.newsClick} className = "list-group-item list-group-item-primary"><i className="fa fa-newspaper-o" aria-hidden="true" ></i><span className="hidden-xs hidden-sm"> News </span></li>
                                    <li className = "list-group-item list-group-item-primary"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Users</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-9">
                        {selected}
                        </div>
                    </div>
                </div>

        );
    }
}

export default Dashboard;