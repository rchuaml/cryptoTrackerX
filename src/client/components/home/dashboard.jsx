import React from 'react';
import Coins from './coins';
import Track from './track';
import News from './news';
import Users from './users';
import Charts from './chart';
import Homecss from '../../styles/home.scss';
import '../../styles/dashboard.scss'

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
    this.usersClick = this.usersClick.bind(this);
    this.chartClick = this.chartClick.bind(this);
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

usersClick(){
    this.setState({selected:"users"});
}

chartClick(){
    this.setState({selected:"charts"});
}

    render(){

        var selected = <Coins/>
        if(this.state.selected === ""){
            selected = <Coins/>
        }else if(this.state.selected === "track"){
            selected = <Track/>
        }else if(this.state.selected === "news"){
            selected = <News/>
        }else if(this.state.selected === "users"){
            selected = <Users/>
        }else if(this.state.selected === "charts"){
            selected = <Charts/>
        }
    return (

                <div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-3">
                            <div className = {Homecss.dashboard}>
                             <div className="card bg-primary text-white text-center active">
                                    <h1>Menu</h1>

                            </div>
                                <ul className = "list-group">
                                    <li onClick = {this.homeClick} className="list-group-item-primary list-group-item" id = "lol"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm "></span>   Home</li>
                                    <li onClick = {this.coinHandler} className = "list-group-item list-group-item-primary"><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Coins</span></li>
                                    <li onClick = {this.trackClick} className = "list-group-item list-group-item-primary"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Tracking List</span></li>
                                    <li onClick = {this.chartClick} className = "list-group-item list-group-item-primary"><i className="fa fa-line-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Charts </span></li>
                                    <li onClick = {this.newsClick} className = "list-group-item list-group-item-primary"><i className="fa fa-newspaper-o" aria-hidden="true" ></i><span className="hidden-xs hidden-sm"> News </span></li>
                                    <li onClick = {this.usersClick} className = "list-group-item list-group-item-primary"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">   Users</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        {selected}
                        </div>
                    </div>
                </div>

        );
    }
}

export default Dashboard;