import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {withRouter} from 'react-router';

class Home extends React.Component{

    render() {
      return(
        <div>
        {(this.props.location.state!==undefined) ? <div class= {"mb-0 alert alert-" + this.props.location.state.type} role="alert"> {this.props.location.state.message} </div> : <div/>
        }
        <Carousel>
            <Carousel.Item>
                <img
                  src="https://res.cloudinary.com/ronzer/image/upload/c_scale,h_610,w_1600/v1550906407/ironmanfinal.jpg" className = "img-fluid" id = "carousel1"
                />
             </Carousel.Item>
            <Carousel.Item>
                    <img
                      src="https://res.cloudinary.com/ronzer/image/upload/c_scale,h_610,w_1600/v1551302446/track.jpg" className = "img-fluid" id = "carousel2"
                    />
            </Carousel.Item>
        </Carousel>
        </div>
      );
    }
}

export default withRouter(Home);