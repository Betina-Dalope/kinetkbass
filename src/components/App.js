import React, { Component, Fragment } from 'react';
import Kinetk from './Kinetk';
import LanternTestScene from './LanternTestScene';


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
				<LanternTestScene></LanternTestScene>
			</Fragment>


		);
	}
}

export default App;
