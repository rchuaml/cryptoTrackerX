import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {withRouter} from 'react-router';


class Home extends React.Component{

    render() {
            console.log(this.props.location);
      return(
        <div>
        {(this.props.location.state!==undefined) ? <div class= {"alert alert-" + this.props.location.state.type} role="alert"> {this.props.location.state.message} </div> : <div/>
        }
        <Carousel>
            <Carousel.Item>
                <img
                  src="https://res.cloudinary.com/ronzer/image/upload/c_scale,h_580,w_1450/v1550906407/ironmanfinal.jpg"
                />
             </Carousel.Item>
            <Carousel.Item>
                    <img
                      src="http://placekitten.com/1450/600"
                    />
            </Carousel.Item>
            <Carousel.Item>
                    <img
                      src="http://placekitten.com/1600/600"
                    />
            </Carousel.Item>
        </Carousel>
        </div>
      );
    }
}

export default withRouter(Home);