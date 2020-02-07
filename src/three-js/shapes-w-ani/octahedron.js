import Shape from './shape.js';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

export class Octahedron extends Shape {
    constructor() {
        
        var geometry = new THREE.OctahedronGeometry( 0.6 );
        var colors = { primary: "purple", secondary: "red" };
        super( geometry, colors );

        this.entity.position.set(-6,0,0);

        //this._outerLayers.add(this._copyFaces("#590304", .1, .8));
    }
    
    
}

export default Octahedron;