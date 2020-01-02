
import * as THREE from 'three';
import React, { Component } from 'react';
// import Stats from 'three-full';
//import { GUI } from './jsm/libs/dat.gui.module.js';
import 'react-dat-gui/dist/index.css';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString, DatFolder } from 'react-dat-gui';

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { OrbitControls, GLTFLoader, TrackballControls, EffectComposer, RenderPass, UnrealBloomPass } from 'three-full';

import Cube from '../three-js/shapes-w-ani/cube';


class Animation extends Component {

    state = {
        params: {
            exposure: 2,
            bloomStrength: 1.5,
            bloomThreshold: 0.1,
            bloomRadius: 1,
            ambientLight: "#ffffff",
            pointLight: "yellow",
            camera: {
                x: -5,
                y: 0,
                z: 0
            }
        },
        shapes: [
            { title: 'Cube', constructor: Cube },
        ]
    }

    constructor(props) {
        super(props);
        var scene, camera, controls, pointLight, stats;
        var composer;


        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = Math.pow(this.state.params.exposure, 4.0); // modified - exposure only works on the render not the bloom pass

        // 2. set up camera
        scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        this.camera.position.set(this.state.params.camera.x, this.state.params.camera.y, this.state.params.camera.z);
        scene.add(this.camera);

        //Use Orbit controls to maintain a positive y (do not allow going underneath the scene)
        controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0;
        controls.maxDistance = 20;


        this.ambientLight = new THREE.AmbientLight(this.state.params.ambientLight, .5)
        scene.add(this.ambientLight);
        this.pointLight = new THREE.PointLight(this.state.params.pointLight, .5, 2);
        this.camera.add(this.pointLight);


        // 3. set up bloompass
        this.composer = new EffectComposer(this.renderer);

        var renderScene = new RenderPass(scene, this.camera);
        var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = this.state.params.bloomThreshold;
        bloomPass.strength = this.state.params.bloomStrength;
        bloomPass.radius = this.state.params.bloomRadius;

        
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);


        var geometry = new THREE.IcosahedronGeometry( 0.6 );
        var material = new THREE.MeshPhongMaterial({color: "black" })

       var icosahedron = new THREE.Mesh( geometry, material ); 
       icosahedron.position.set(-1,0,0);
       scene.add(icosahedron);


        this._forEachShape((shape, index) => {
            var constructor = shape.constructor;
            var object = new constructor();
            //object.entity.position.set(0,0,0);
            console.log(object);
            scene.add(object.entity);
            shape.object = object; // effects the state

            console.log(object._basicShape);
        })


        window.onresize = () => {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            this.composer.setSize(width, height);
        };
    }

    componentDidMount() {
        this.refs.component.appendChild(this.renderer.domElement);  //modified


        this.animate()
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.composer.render();

        this._forEachShape((shape) => {
            shape.object.animate();
        })
    }

    _forEachShape = (f) => {
        for (var index in this.state.shapes) {
            var shape = this.state.shapes[index];
            f(shape, index = null);
        }
    }


    render() {
        const { params } = this.state;


        return (


            <div ref="component">

            </div>

        );
    }
}

export default Animation;
