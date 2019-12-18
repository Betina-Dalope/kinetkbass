
import * as THREE from 'three';
import React, { Component } from 'react';
// import Stats from 'three-full';
//import { GUI } from './jsm/libs/dat.gui.module.js';
import 'react-dat-gui/dist/index.css';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import { OrbitControls, GLTFLoader, EffectComposer, RenderPass, UnrealBloomPass, ShaderPass } from 'three-full';

import Cube from '../three-js/cube.js';
import Icosahedron from '../three-js/icosehadron';
import Octahedron from '../three-js/octahedron';
import Tetrahedron from '../three-js/tetrahedron';


class SelectiveBloomTestScene extends Component {

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

		var ENTIRE_SCENE = 0, BLOOM_SCENE = 1, NON_BLOOM_SCENE = 2;
			var bloomLayer = new THREE.Layers();
			bloomLayer.set( BLOOM_SCENE );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        this.renderer.toneMappingExposure = this.state.params.exposure; // modified - exposure only works on the render not the bloom pass
        this.refs.component.appendChild(this.renderer.domElement);  //modified

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set( 0, 0, 20 );
        camera.lookAt( 0, 0, 0 );
        //scene.add(camera);  -- this is from the glowtestscene but turns out you don't need it
        controls = new OrbitControls(camera, this.renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        scene.add(new THREE.AmbientLight(0x404040));
        // pointLight = new THREE.PointLight(0xffffff, 1);
        // camera.add(pointLight);

        var renderScene = new RenderPass(scene, camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.state.params.bloomThreshold;
        this.bloomPass.strength = this.state.params.bloomStrength;
        this.bloomPass.radius = this.state.params.bloomRadius;
        
        this.bloomPass.renderToScreen = true;
        var bloomComposer = new EffectComposer(this.renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass( renderScene );
        bloomComposer.addPass( this.bloomPass );
        

        var finalPass = new ShaderPass(
            new THREE.ShaderMaterial({
              uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture }
              },
              vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",
              fragmentShader: "uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv; vec4 getTexture( sampler2D texture ) { return mapTexelToLinear( texture2D( texture , vUv ) ); } void main() { gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture(bloomTexture ) ); }",
              defines: {}
            }),
            "baseTexture"
        );
        finalPass.needsSwap = true;
        

        var finalComposer = new EffectComposer(this.renderer);
        
        finalComposer.addPass(renderScene);
        finalComposer.addPass(finalPass);
        finalPass.renderToScreen = true;



        var _this = this;

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.set(2, 2, 2)
        cube.layers.enable( BLOOM_SCENE );
        scene.add( cube );

        for(var i in geometry.faces) {
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1, 1 ) , material );
            plane.layers.enable( NON_BLOOM_SCENE );
            plane.position.set(geometry.faces[i].normal); 
            //plane.position.set(0, 0, 1) //a child objects position is relative to the parent objects position
            cube.add( plane );

            console.log(geometry.faces[i].normal);
        }

        var geometry = new THREE.PlaneGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry , material );
        plane.layers.enable( NON_BLOOM_SCENE );
        plane.position.set(0, 0, 1) //a child objects position is relative to the parent objects position
        cube.add( plane );



        

        

        var geometry = new THREE.IcosahedronGeometry(0.6);
        var material = new THREE.MeshBasicMaterial( { color: "red" } );

        var octahedron = new THREE.Mesh( geometry, material );
        octahedron.position.set(1, 1, 1);
        octahedron.layers.enable( NON_BLOOM_SCENE );
        scene.add( octahedron );

        console.log(geometry.faces);

        animate();


        window.onresize = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            _this.renderer.setSize(width, height);
            bloomComposer.setSize(width, height);
        };


        function animate() {
            requestAnimationFrame(animate);


            // to only render the bloom scene
            _this.renderer.autoClear = false
            _this.renderer.clear();
            camera.layers.set( BLOOM_SCENE );
            bloomComposer.render();
            // 


            // to render both
            _this.renderer.clearDepth();
            camera.layers.set( NON_BLOOM_SCENE );
            
            _this.renderer.render(scene, camera);

            
            // the way you're supposed to do it but it definitely does not work
            // octahedron.material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

            // bloomComposer.render();
            // _this.renderer.setClearColor( 0xffffff, 0);

            // octahedron.material = new THREE.MeshBasicMaterial( { color: 0x800080 } );

            // finalComposer.render();


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

        console.log(this.bloomPass);
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

export default SelectiveBloomTestScene;
