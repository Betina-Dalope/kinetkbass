import Shape from './shape.js';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

export class Octahedron extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.OctahedronGeometry( 0.6 );
        var material = new THREE.MeshPhongMaterial({color: "black" })

        this._basicShape = new THREE.Mesh( geometry, material ); 

        this.entity.add(this._basicShape);
        this.entity.position.set(-6,0,0);

        this.entity.add(this._createWireframe());

    }
    
    
}

export default Octahedron;