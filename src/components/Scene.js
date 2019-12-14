import React, { Component } from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

import Cube from '../three-js/cube.js';
import Icosahedron from '../three-js/icosehadron';
import Octahedron from '../three-js/octahedron';
import Tetrahedron from '../three-js/tetrahedron';

import Prototypes from '../three-js/prototypes';

class Scene extends Component {
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
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        this.camera.position.z = 10;

        this.light = new THREE.PointLight( 0xff0000, 1, 100 );
        this.light.shadowMapVisible = true;
        this.light.position.set( 50, 50, 50 );
        this.scene.add( this.light );

        this.camera.add( new THREE.AmbientLight( 0x404040 ) );

        // Create 3.js objects from shape data
        this.shapes = [];
        for (var index in this.state.shapes) {
            var constructor = this.state.shapes[index].constructor;
            var shape = new constructor();
            this.shapes.push(shape);
        }

        //place ojbects in canvas
        var x = -5;

        this._forEachShape((shape) => {
            shape.entity.position.set(x, 0, 0)
            this.scene.add( shape.entity );

            x = x + 3;            
        })

        //set up rays of interaction
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        this.listeners = [];
        
        window.addEventListener( 'mousemove', this.onMouseMove, false ); // we're checking of mouse moved over an object
        window.addEventListener( 'mousedown', this.onMouseDown, false );
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

        this._forEachShape((shape) => {
            var intersects = this.raycaster.intersectObjects([shape.entity]);

            if (intersects.length > 0) //if mouse intersects the object
                shape.onHover()
            else
                shape.defaultAni();
        })

    }

    onMouseDown = (e) => {
        this._forEachShape((shape) => {
            var intersects = this.raycaster.intersectObjects([shape.entity]);

            if (intersects.length > 0) //if mouse intersects the object
                this._moveToObject(shape);
        })       
    }

    _moveToObject = (shape) => {
        // look!  you can tween the properties of any object
        this.camera.lookAt(this.camera.position);
        TweenMax.set(this.camera.position, {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z})
        TweenMax.to(this.camera.position, 3, {
            x: shape.entity.position.x,
            y: shape.entity.position.y,
            z: shape.entity.position.z,
            onComplete: () => {
                //this.camera.position.set(shape.entity.position);
                window.removeEventListener('mousemove', this.onMouseMove)
                window.removeEventListener('mousedown', this.onMouseDown)
                shape.defaultAni();
            }
        });
    }

    _forEachShape = (f) => {
        for (var index in this.shapes) {
            var shape = this.shapes[index];
            f(shape);
        }        
    }

    animate = () => {
        requestAnimationFrame( this.animate );
        this._forEachShape((shape) => {
            shape.animate();
        })

        this.renderer.render( this.scene, this.camera );
    }

    render() {

        return (
            <div ref="component">

            </div>

        );
    }
}

export default Scene;

