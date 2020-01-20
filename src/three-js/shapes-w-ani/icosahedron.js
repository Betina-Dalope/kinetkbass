import Shape from './shape.js';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

export class Icosahedron extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.IcosahedronGeometry( 0.6 );
        var material = new THREE.MeshPhongMaterial({color: "black" })

        this._basicShape = new THREE.Mesh( geometry, material ); 

        this.entity.add(this._basicShape);

        this._wireframe = this._createWireframe();

        this.entity.add(this._wireframe);
        this.entity.position.set(-3,0,0);


        

    }

    initAni = () => {
        this.animate = () => {};
        this.entity.position.set(-1,0,0);
        this._wireframe.visible = false;
        this._outerLayers.visible = false;
        this._basicShape.visible = true;
        TweenMax.delayedCall(5, () => {
            this.entity.position.set(-3,0,0);
            this._wireframe.visible = true;
            this._outerLayers.visible = true;
        })
    }

    openAni = () => {
        this._basicShape.visible = false;
        this.entity.remove(this._wireframe);
        this._wireframe = this._createWireframe("purple", .2, 1);
        this.entity.add(this._wireframe);

        this._outerLayers.add(this._copyFaces("blue", .15, .6));

        this.animate = () => {
            this._wireframe.rotation.x += .01;
            this._wireframe.rotation.y += .01;
            this._outerLayers.rotation.z -= .02;
            this._outerLayers.rotation.x -= .02;

            this.entity.rotation.y -= .01;
            this.entity.rotation.z += .01;
        }
    }
    
    
}

export default Icosahedron;