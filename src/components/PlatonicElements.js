import React, { Component } from 'react';
import * as THREE from 'three';

import Cube from '../three-js/cube.js';
import Icosahedron from '../three-js/icosehadron';
import Octahedron from '../three-js/octahedron';
import Tetrahedron from '../three-js/tetrahedron';

class PlatonicElement extends Component {
    state = {
        shapes: [
            { title: 'Cube', constructor: Cube },
            { title: 'Icosahedron', constructor: Icosahedron },
            { title: 'Octahedron', constructor: Octahedron },
            { title: 'Tetrahedron', constructor: Tetrahedron }
        ]
    }
    constructor(props) {
        super(props);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );

        this.camera.position.z = 10;

        // Create 3.js objects from shape data
        this.shapes = [];
        for (var index in this.state.shapes) {
            var constructor = this.state.shapes[index].constructor;
            var shape = new constructor();
            this.shapes.push(shape);
        }

        //place ojbects in canvas
        var x = -5;

        this.forEachShape((shape) => {
            var shape = shape.shape
            shape.position.set(x, 0, 0)
            this.scene.add( shape );

            x = x + 3;            
        })




        //set up rays of interaction
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        window.addEventListener( 'mousemove', this.onMouseMove, false ); // we're checking of mouse moved over an object


    }

    componentDidMount() {
        this.refs.component.appendChild( this.renderer.domElement );  

        this.animate();

    }

    onMouseMove = (e) => {
        //converts position of mouse to something on the x and y grid
        this.mouseVector.x = 2 * (e.clientX / this.width) - 1;
        this.mouseVector.y = 1 - 2 * ( e.clientY / this.height );
        this.raycaster.setFromCamera(this.mouseVector, this.camera);

        this.forEachShape((shape) => {
            var intersects = this.raycaster.intersectObjects(shape.shape);

            if (intersects.length > 0) //if mouse intersects the object
                console.log(intersects)
        })

    }

    forEachShape = (f) => {
        for (var index in this.shapes) {
            var shape = this.shapes[index];
            f(shape);
        }        
    }

    animate = () => {
        requestAnimationFrame( this.animate );

        console.log(this);
        this.forEachShape((shape) => {
            shape.animate();
        })

        this.renderer.render( this.scene, this.camera );
    }

    render() {

        return (
            <div ref="component"></div>

        );
    }
}

export default PlatonicElement;

