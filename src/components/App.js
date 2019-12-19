import React, { Component, Fragment } from 'react';
import Kinetk from './Kinetk';
import Scene from './DetailedLanternTestScene';


class App extends Component {
	state = {
		skip_title_screen: false
	}

	componentDidMount() {
	}

	render() {

		return (
			// uncomment for actual app
			<Fragment>
				<Kinetk></Kinetk>
				<Scene></Scene>
			</Fragment>


		);
	}
}

export default App;
