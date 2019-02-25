import React from 'react';
import Coins from './coins';

class Dashboard extends React.Component{

    render(){
    return (
                <div>
                    <div class="row">
                        <div class="col-3">
                    <ul class = "list-group">
                        <li class=" list-group-item active"><h4 class="hidden-xs hidden-sm text-dark">Menu</h4></li>
                        <li class="list-group-item-primary list-group-item"><a href="#"><i class="fa fa-home" aria-hidden="true"></i><span class="hidden-xs hidden-sm">Home</span></a></li>
                        <li class = "list-group-item list-group-item-primary"><a href="#"><i class="fa fa-tasks" aria-hidden="true"></i><span class="hidden-xs hidden-sm">Workflow</span></a></li>
                        <li class = "list-group-item list-group-item-primary"><a href="#"><i class="fa fa-bar-chart" aria-hidden="true"></i><span class="hidden-xs hidden-sm">Statistics</span></a></li>
                        <li class = "list-group-item list-group-item-primary"><a href="#"><i class="fa fa-user" aria-hidden="true"></i><span class="hidden-xs hidden-sm">Calender</span></a></li>
                        <li class = "list-group-item list-group-item-primary"><a href="#"><i class="fa fa-calendar" aria-hidden="true"></i><span class="hidden-xs hidden-sm">Users</span></a></li>
                        <li class = "list-group-item list-group-item-primary"><a href="#"><i class="fa fa-cog" aria-hidden="true"></i><span class="hidden-xs hidden-sm">Setting</span></a></li>
                    </ul>
                        </div>
                            <div class="col-9">
                                    <Coins/>
                            </div>
                    </div>
                </div>

        );
    }
}

export default Dashboard;