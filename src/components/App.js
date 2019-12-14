import React, { Component, Fragment } from 'react';
import Kinetk from './Kinetk';
import GlowTestScene from './GlowTestScene';


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
				<GlowTestScene></GlowTestScene>
			</Fragment>


		);
	}
}

export default App;
