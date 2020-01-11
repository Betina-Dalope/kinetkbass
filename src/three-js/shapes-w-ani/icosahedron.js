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

        this._wireframe = this._createWireframe()

        this.entity.add(this._wireframe);

    }

    initAni = () => {
        this.entity.position.set(-1,0,0);
        this._wireframe.visible = false;
        TweenMax.delayedCall(5, () => {
            this.entity.position.set(-3,0,0);
            this._wireframe.visible = true;
        })
    }
    
    
}

export default Icosahedron;