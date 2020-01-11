
import * as THREE from 'three';
import React, { Component } from 'react';
import { TweenMax } from 'gsap';

import 'react-dat-gui/dist/index.css';
import DatGui, { DatSelect, DatNumber, DatButton, DatFolder } from 'react-dat-gui';

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Cube from '../three-js/shapes-w-ani/cube';
import Icosahedron from '../three-js/shapes-w-ani/icosahedron';
import Tetrahedron from '../three-js/shapes-w-ani/tetrahedron';
import Octahedron from '../three-js/shapes-w-ani/octahedron';

import Camera from '../three-js/camera';
import Light from '../three-js/light';



class Animation extends Component {

    state = {
        params: {
            exposure: 1.5,
            bloomStrength: 1.5,
            bloomThreshold: 0.1,
            bloomRadius: 1,
            animation: 'initAni'
        },
        shapes: [
            { title: 'Cube', constructor: Cube },
            { title: 'Icosahedron', constructor: Icosahedron },
            { title: 'Octahedron', constructor: Octahedron },
            { title: 'Tetrahedron', constructor: Tetrahedron },
        ]
    }

    constructor(props) {
        super(props);
        var scene, controls;


        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = Math.pow(this.state.params.exposure, 4.0); // modified - exposure only works on the render not the bloom pass

        // 2. set up camera
        scene = new THREE.Scene();
        this.camera = new Camera(scene, this.renderer);


        new Light(scene, this.camera.entity);

        //Use Orbit controls to maintain a positive y (do not allow going underneath the scene)
        var controls = new OrbitControls(this.camera.entity, this.renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0;
        controls.maxDistance = 20;


        // 3. set up bloompass
        this.composer = new EffectComposer(this.renderer);

        var renderScene = new RenderPass(scene, this.camera.entity);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.state.params.bloomThreshold;
        this.bloomPass.strength = this.state.params.bloomStrength;
        this.bloomPass.radius = this.state.params.bloomRadius;

        
        this.composer.addPass(renderScene);
        this.composer.addPass(this.bloomPass);

        this._forEachShape((shape, index) => {
            var constructor = shape.constructor;
            var object = new constructor();

            scene.add(object.entity);
            shape.object = object; // effects the state
        })


        window.onresize = () => {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.camera.update()
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

    handleUpdate = (newParams) => {
        this.setState(prevState => ({
            params: { ...prevState.params, ...newParams }
        }));

        this.bloomPass.threshold = newParams.bloomThreshold;
        this.bloomPass.strength = newParams.bloomStrength;
        this.bloomPass.radius = newParams.bloomRadius;
        this.renderer.toneMappingExposure = Math.pow(newParams.exposure, 4.0);
    }

    initAni = () => {
        TweenMax.killAll();
        this.camera.initAni();

        this._forEachShape((shape) => {
            shape.object.initAni();
        })
    }

    otherAni = () => {
        TweenMax.killAll();
        console.log('otherAni');
    }

    render() {

        this[this.state.params.animation]();
        const { params } = this.state;

        return (


            <div ref="component">

                <DatGui data={params} onUpdate={this.handleUpdate}>
                    <DatFolder title="Bloom">
                        <DatNumber path='exposure' min={0.1} max={2.0} step={0.1}/>
                        <DatNumber path='bloomStrength'  min={0.0} max={1.0} step={0.1}/>
                        <DatNumber path='bloomThreshold' min={0.0} max={3.0} step={0.1}/>
                        <DatNumber path='bloomRadius' min={0.0} max={1.0} step={0.01}/>
                    </DatFolder>
                    <DatFolder title="Animation">
                        <DatSelect path='animation' options={ ['initAni', 'otherAni'] }></DatSelect>
                        <DatButton label='Replay' onClick={ this[this.state.params.animation] }></DatButton>
                    </DatFolder>
                </DatGui>
            </div>

        );
    }
}

export default Animation;
