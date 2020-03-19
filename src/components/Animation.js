
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
import Shape from '../three-js/shapes-w-ani/shape';

import Camera from '../three-js/camera';
import Light from '../three-js/light';



class Animation extends Component {

    state = {
        params: {
            exposure: 1.5,
            bloomStrength: 1.5,
            bloomThreshold: 0.1,
            bloomRadius: 1,
            animation: 'mainMenu',
            activeShape: 'Octahedron'
        },
        shapes: {
            'Cube': { chakra_color: 'red', element_color: 'green', geometry: new THREE.BoxBufferGeometry( 6, 6, 6 ) },
            'Icosahedron': { chakra_color: 'orange', element_color: 'blue', geometry: new THREE.IcosahedronBufferGeometry( 5 ) },
            'Octahedron': { chakra_color: 'green', element_color: 'indigo', geometry: new THREE.OctahedronBufferGeometry( 4.5 ) },
            'Tetrahedron': { chakra_color: 'blue', element_color: 'red', geometry: new THREE.TetrahedronBufferGeometry( 6.5 ) },

        }
    }

    constructor(props) {
        super(props);
        var scene, controls;


        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //this.renderer.toneMapping = THREE.ReinhardToneMapping;
        //this.renderer.toneMappingExposure = Math.pow(this.state.params.exposure, 4.0); // modified - exposure only works on the render not the bloom pass
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.BasicShadowMap;

        // 2. set up camera
        scene = new THREE.Scene();
        //scene.fog = new THREE.Fog( 'white', 0, 20)
        this.camera = new Camera(scene, this.renderer);


        this.light = new Light(scene, this.camera.entity);

        //Use Orbit controls to maintain a positive y (do not allow going underneath the scene)
        this.controls = new OrbitControls(this.camera.entity, this.renderer.domElement);
        this.controls.maxPolarAngle = Math.PI * 0.5;
        this.controls.minDistance = 0;
        this.controls.maxDistance = 100;


        // 3. set up bloompass
        this.composer = new EffectComposer(this.renderer);

        var renderScene = new RenderPass(scene, this.camera.entity);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.state.params.bloomThreshold;
        this.bloomPass.strength = this.state.params.bloomStrength;
        this.bloomPass.radius = this.state.params.bloomRadius;

        
        this.composer.addPass(renderScene);
        //this.composer.addPass(this.bloomPass);


        // 4. create elements
        var distance_between_shapes = 20;
        var positionX = ((Object.keys(this.state.shapes).length * distance_between_shapes) / -2) - (distance_between_shapes / 2);
        for (var i in this.state.shapes) {
            var chakra_color = this.state.shapes[i].chakra_color;
            var element_color = this.state.shapes[i].element_color;
            var geometry = this.state.shapes[i].geometry;

            // calculate position
            var positionX = positionX + distance_between_shapes;

            // add object to state
            this.state.shapes[i].object = new Shape(geometry, chakra_color, element_color);
            this.state.shapes[i].object.entity.position.set( positionX, 0, 0);
            //scene.add( this.state.shapes[i].object.entity );

            console.log(positionX + 50)

            var entity = this.state.shapes[i].object.entity;
            setTimeout(function(entity) {
                scene.add( entity );
            }, positionX + 50, entity)


        }

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

        // this.bloomPass.threshold = newParams.bloomThreshold;
        // this.bloomPass.strength = newParams.bloomStrength;
        // this.bloomPass.radius = newParams.bloomRadius;
        // this.renderer.toneMappingExposure = Math.pow(newParams.exposure, 4.0);
    }

    initAni = () => {
        TweenMax.killAll();
        this.camera.initAni();
        this.light.initAni();

        this._forEachShape((shape) => {
            shape.object.initAni();
        })

    }

    mainMenu = () => {
        TweenMax.killAll();
        this.camera.mainMenu();
        this.light.mainMenu();
        this._forEachShape((shape) => {
            shape.object.mainMenu();
        })

        this.controls.target.set( 0, 0, 0 );
        this.controls.update();
    }

    openAni = () => {
        TweenMax.killAll();
        this.camera.mainMenu();
        this.light.openAni();
        this._forEachShape((shape) => {
            shape.object.openAni();
        })
    }

    goTo = () => {

        TweenMax.killAll();

        this._forEachShape((shape) => {
            shape.object.mainMenu();
        })

        this.camera.goTo( this.state.shapes[ this.state.params.activeShape ].object );
        this.light.openAni();
        this.state.shapes[ this.state.params.activeShape ].object.goTo();

        var position = this.state.shapes[ this.state.params.activeShape ].object.entity.position;

        this.controls.target.set( position.x, position.y, position.z );
        //this.controls.update();
    }

    render() {

        this[this.state.params.animation]();
        const { params } = this.state;

        console.log(this.state.params.animation);
        console.log(this.controls.target);

        return (


            <div ref="component">

                {/* <DatGui data={params} onUpdate={this.handleUpdate}>
                    <DatFolder title="Bloom">
                        <DatNumber path='exposure' min={0.1} max={2.0} step={0.1}/>
                        <DatNumber path='bloomStrength'  min={0.0} max={1.0} step={0.1}/>
                        <DatNumber path='bloomThreshold' min={0.0} max={3.0} step={0.1}/>
                        <DatNumber path='bloomRadius' min={0.0} max={1.0} step={0.01}/>
                    </DatFolder>
                    <DatFolder title="Animation">
                        <DatSelect path='animation' options={ ['initAni', 'mainMenu', 'openAni', 'goTo'] }></DatSelect>
                        <DatButton label='Replay' onClick={ this[this.state.params.animation] }></DatButton>
                    </DatFolder>
                </DatGui> */}

                 <DatGui data={params} onUpdate={this.handleUpdate}>
                    <DatSelect path='activeShape' options={ ['Cube', 'Icosahedron', 'Octahedron', 'Tetrahedron'] }></DatSelect>
                    <DatFolder title="Animation">
                        <DatSelect path='animation' options={ ['initAni', 'mainMenu', 'openAni', 'goTo'] }></DatSelect>
                        <DatButton label='Replay' onClick={ this[this.state.params.animation] }></DatButton>
                    </DatFolder>
                </DatGui>            
            </div>

        );
    }
}

export default Animation;
