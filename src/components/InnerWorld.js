
import * as THREE from 'three';
import React, { Component } from 'react';
// import Stats from 'three-full';
//import { GUI } from './jsm/libs/dat.gui.module.js';
import 'react-dat-gui/dist/index.css';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString, DatFolder } from 'react-dat-gui';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import Cube from '../three-js/shapes/cube';
import Icosahedron from '../three-js/shapes/icosahedron';
import Octahedron from '../three-js/shapes/octahedron';
import Tetrahedron from '../three-js/shapes/tetrahedron';


class Scene extends Component {

    state = {
        params: {
            exposure: 1.1,
            bloomStrength: 1.5,
            bloomThreshold: 0.2,
            bloomRadius: 1,
            ambientLight: "#a94343",
            pointLight: "yellow"
        },
        shapes: [
            { title: 'Cube', constructor: Cube },
            { title: 'Icosahedron', constructor: Icosahedron },
            { title: 'Octahedron', constructor: Octahedron },
            { title: 'Tetrahedron', constructor: Tetrahedron }
        ]
    }

    constructor(props) {
        super(props);


        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(-6, 0, 0);
        scene.add(camera);


        this.ambientLight = new THREE.AmbientLight(this.state.params.ambientLight, .5)
        scene.add(this.ambientLight);
        this.pointLight = new THREE.PointLight(this.state.params.pointLight, .5, 2);

        this.drawCube(scene); // add this to inside the gltfloader callback


        window.onresize = () => {
            var width = window.innerWidth;
            var height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            this.composer.setSize(width, height);
        };
    }

    componentDidMount() {

    
    }


    drawCube = (scene) => {
        //var gridHelper = new THREE.GridHelper( 20, 20 );
        var gridHelper = new THREE.PolarGridHelper();
        scene.add( gridHelper );

        this.shapes = [];
        for (var index in this.state.shapes) {
            var constructor = this.state.shapes[index].constructor;
            var shape = new constructor();
            this.shapes.push(shape);
        }

        var x = -4.5;
        this._forEachShape((shape, index) => {

            shape.group.position.set(x, 0, 0)
            
            // OR change all of the create geometries to buffer geometries
            setTimeout(function() {
                scene.add( shape.group );
            }, 100 * index)

            x = x + 3;            
        })


    }

    _forEachShape = (f) => {
        for (var index in this.shapes) {
            var shape = this.shapes[index];
            f(shape, index = null);
        }        
    }

    render() {


        return (
            

            <div ref="component">

            </div>

        );
    }
}

export default Scene;
