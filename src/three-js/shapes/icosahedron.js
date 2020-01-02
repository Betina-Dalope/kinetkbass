import Shape from './shape.js';
import * as THREE from 'three';

export class Icosahedron extends Shape {
    constructor() {

        super();
        
        var geometry = new THREE.IcosahedronGeometry(0.8);
        var material = new THREE.MeshBasicMaterial( { color: "yellow" } );

        this.basicShape = new THREE.Mesh( geometry, material ); 

        this.group.add(this._copyFaces("blue", .2, .6));

    }    
}

export default Icosahedron;