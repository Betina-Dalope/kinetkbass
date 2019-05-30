import React, { Component, Fragment } from 'react';
import Kinetk from './Kinetk';
import PlatonicElement from './PlatonicElement';


class App extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <Fragment>
        <Kinetk></Kinetk>
        <PlatonicElement></PlatonicElement>
        {/* <PlatonicElement></PlatonicElement>
        <PlatonicElement></PlatonicElement>
        <PlatonicElement></PlatonicElement> */}
      </Fragment>
      
      
      
    );
  }
}

export default App;
