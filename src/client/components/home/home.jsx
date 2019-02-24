import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

class Home extends React.Component{

    render() {

      return(
        <div>
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

export default Home;