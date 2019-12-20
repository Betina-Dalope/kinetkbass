
import * as THREE from 'three';
import React, { Component } from 'react';
// import Stats from 'three-full';
//import { GUI } from './jsm/libs/dat.gui.module.js';
import 'react-dat-gui/dist/index.css';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString, DatFolder } from 'react-dat-gui';
import { OrbitControls, GLTFLoader, EffectComposer, RenderPass, UnrealBloomPass } from 'three-full';

import Cube from '../three-js/shapes/cube';
import Icosahedron from '../three-js/shapes/icosahedron';
import Octahedron from '../three-js/shapes/octahedron';
import Tetrahedron from '../three-js/shapes/tetrahedron';


class LanternTestScene extends Component {

    state = {
        params: {
            exposure: 1.1,
            bloomStrength: 1.5,
            bloomThreshold: 0.2,
            bloomRadius: 1,
            ambientLight: "#FFFFFF"
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
        var scene, camera, controls, pointLight, stats;
        var composer;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure =  Math.pow(this.state.params.exposure, 4.0); // modified - exposure only works on the render not the bloom pass
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(-6, 0, 0);
        scene.add(camera);
        controls = new OrbitControls(camera, this.renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = -5;
        controls.maxDistance = 20;
        this.ambientLight = new THREE.AmbientLight("white", .5)
        scene.add(this.ambientLight);
        pointLight = new THREE.PointLight("yellow", .5, 2);
        camera.add(pointLight);

        var renderScene = new RenderPass(scene, camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.state.params.bloomThreshold;
        this.bloomPass.strength = this.state.params.bloomStrength;
        this.bloomPass.radius = this.state.params.bloomRadius;
        this.bloomPass.renderToScreen = true; //modified and very necessary to work

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(this.bloomPass);

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
        this.refs.component.appendChild(this.renderer.domElement);  //modified

        this.animate()
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.composer.render();
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

        var x = -5;
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

    handleUpdate = (newParams) => {
        this.setState(prevState => ({
            params: { ...prevState.params, ...newParams }
        }));

        this.bloomPass.threshold = newParams.bloomThreshold;
        this.bloomPass.strength = newParams.bloomStrength;
        this.bloomPass.radius = newParams.bloomRadius;
        this.renderer.toneMappingExposure = Math.pow(newParams.exposure, 4.0);


        this.ambientLight.color = new THREE.Color(newParams.ambientLight);

        
    }

    render() {
        const { params } = this.state;


        return (
            

            <div ref="component">
                <DatGui data={params} onUpdate={this.handleUpdate}>
                    <DatFolder title="Bloom">
                    <DatNumber path='exposure' label='exposure' min={0.1} max={2.0} step={0.1}/>
                    <DatNumber path='bloomStrength' label='bloomStrength' min={0.0} max={1.0} step={0.1}/>
                    <DatNumber path='bloomThreshold' label='bloomThreshold' min={0.0} max={3.0} step={0.1}/>
                    <DatNumber path='bloomRadius' label='bloomRadius' min={0.0} max={1.0} step={0.01}/>

                    <DatColor path='ambientLight' label='ambientLight'/>
                    </DatFolder>
                </DatGui>
            </div>

        );
    }
}

export default LanternTestScene;
