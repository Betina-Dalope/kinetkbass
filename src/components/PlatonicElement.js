import React, { Component } from 'react';
import * as THREE from 'three';

class PlatonicElement extends Component {

    constructor(props) {
        super(props);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );

        this.camera.position.z = 10;
        
        //create cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );

        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        // create wireframe
        var geo = new THREE.EdgesGeometry( this.cube.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth: 4 } );
        var wireframe = new THREE.LineSegments( geo, mat );
        wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
        this.cube.add( wireframe );



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

        var intersects = this.raycaster.intersectObjects([this.cube]);

        if (intersects.length > 0) //if mouse intersects the object
            console.log(intersects)

    }

    animate = () => {
        requestAnimationFrame( this.animate );

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );
    }

    render() {

        return (
            <div ref="component"></div>

        );
    }
}

export default PlatonicElement;

