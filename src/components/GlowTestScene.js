
import * as THREE from 'three';
import React, { Component } from 'react';
// import Stats from 'three-full';
//import { GUI } from './jsm/libs/dat.gui.module.js';
import 'react-dat-gui/dist/index.css';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import { OrbitControls, GLTFLoader, EffectComposer, RenderPass, UnrealBloomPass } from 'three-full';

import Cube from '../three-js/cube.js';
import Icosahedron from '../three-js/icosehadron';
import Octahedron from '../three-js/octahedron';
import Tetrahedron from '../three-js/tetrahedron';


class GlowTestScene extends Component {

    state = {
        params: {
            exposure: 5,
            bloomStrength: 1.5,
            bloomThreshold: 0,
            bloomRadius: 0
        },
        shapes: [
            { title: 'Cube', constructor: Cube },
            { title: 'Icosahedron', constructor: Icosahedron },
            { title: 'Octahedron', constructor: Octahedron },
            { title: 'Tetrahedron', constructor: Tetrahedron }
        ]
    }

    componentDidMount() {

        var scene, camera, controls, pointLight, stats;
        var composer, renderer, mixer;
        // var params = {
        //     exposure: 1,
        //     bloomStrength: 1.5,
        //     bloomThreshold: 0,
        //     bloomRadius: 0
        // };
        var clock = new THREE.Clock();
        //var container = document.getElementById('container');
        //stats = new Stats();
        //container.appendChild(stats.dom);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = this.state.params.exposure; // modified - exposure only works on the render not the bloom pass
        this.refs.component.appendChild(this.renderer.domElement);  //modified
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(-6, 0, 0);
        scene.add(camera);
        controls = new OrbitControls(camera, this.renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        scene.add(new THREE.AmbientLight(0x404040));
        pointLight = new THREE.PointLight(0xffffff, 1);
        camera.add(pointLight);

        var renderScene = new RenderPass(scene, camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.state.params.bloomThreshold;
        this.bloomPass.strength = this.state.params.bloomStrength;
        this.bloomPass.radius = this.state.params.bloomRadius;
        this.bloomPass.renderToScreen = true; //modified and very necessary to work

        composer = new EffectComposer(this.renderer);
        composer.addPass(renderScene);
        composer.addPass(this.bloomPass);

        var _this = this;
        // new GLTFLoader().load('models/PrimaryIonDrive.glb', function (gltf) {

        //     var model = gltf.scene;
        //     scene.add(model);
        //     // Mesh contains self-intersecting semi-transparent faces, which display
        //     // z-fighting unless depthWrite is disabled.
        //     var core = model.getObjectByName('geo1_HoloFillDark_0');
        //     core.material.depthWrite = false;
        //     mixer = new THREE.AnimationMixer(model);
        //     var clip = gltf.animations[0];
        //     mixer.clipAction(clip.optimize()).play();
        // });

        _this.drawCube(scene); // add this to inside the gltfloader callback
        animate();


        window.onresize = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            _this.renderer.setSize(width, height);
            composer.setSize(width, height);
        };


        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            //mixer.update(delta);
            _this._forEachShape((shape) => {
                shape.animate();
            })
            //stats.update();
            composer.render();
        }
    }

    drawCube = (scene) => {
        var gridHelper = new THREE.GridHelper( 10, 10 );
        scene.add( gridHelper );

        this.shapes = [];
        for (var index in this.state.shapes) {
            var constructor = this.state.shapes[index].constructor;
            var shape = new constructor();
            this.shapes.push(shape);
        }

        var x = -5;
        this._forEachShape((shape) => {
            shape.entity.position.set(x, 0, 0)
            scene.add( shape.entity );

            x = x + 3;            
        })

    }

    _forEachShape = (f) => {
        for (var index in this.shapes) {
            var shape = this.shapes[index];
            f(shape);
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

        //console.log(this.bloomPass);
    }

    render() {
        const { params } = this.state;


        return (
            

            <div ref="component">
                <DatGui data={params} onUpdate={this.handleUpdate}>
                    <DatNumber path='exposure' label='exposure' min={0.1} max={2.0} step={0.1}/>
                    <DatNumber path='bloomStrength' label='bloomStrength' min={0.0} max={1.0} step={0.1}/>
                    <DatNumber path='bloomThreshold' label='bloomThreshold' min={0.0} max={3.0} step={0.1}/>
                    <DatNumber path='bloomRadius' label='bloomRadius' min={0.0} max={1.0} step={0.01}/>
                </DatGui>
            </div>

        );
    }
}

export default GlowTestScene;
