import Shape from './shape.js';
import * as THREE from 'three';

export class Tetrahedron extends Shape {
    constructor() {
        
        var geometry = new THREE.TetrahedronGeometry( 0.8 );
        var colors = { primary: "red", secondary: "cyan" };
        super( geometry, colors );

        this.entity.position.set(-9,0,0);

    }

}

export default Tetrahedron;