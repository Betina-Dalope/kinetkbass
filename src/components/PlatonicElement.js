import React, { Component, Fragment } from 'react';
import Kinetk from './Kinetk';
import Scene from './Scene';


import Cube from '../three-js/cube.js';
import Icosahedron from '../three-js/icosehadron';
import Octahedron from '../three-js/octahedron';
import Tetrahedron from '../three-js/tetrahedron';


class PlatonicElement extends Component {

    constructor(props) {
        super(props);

        var constructor = props.constructor;
        this.shape = new constructor();
    }

	componentDidMount() {
	}

	render() {

		return (

			<div ref="component">{ this.props.title }</div>

		);
	}
}

export default PlatonicElement;