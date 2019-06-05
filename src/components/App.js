import React, { Component, Fragment } from 'react';
import Kinetk from './Kinetk';
import PlatonicElements from './PlatonicElements';


class App extends Component {
	state = {
		skip_title_screen: false
	}

	componentDidMount() {
	}

	render() {

		return (
			<Fragment>
				<Kinetk></Kinetk>
				<PlatonicElements></PlatonicElements>
			</Fragment>



		);
	}
}

export default App;
