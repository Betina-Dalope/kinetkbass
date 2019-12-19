import Shape from './shape.js';
import * as THREE from 'three';

export class Tetrahedron extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.TetrahedronGeometry(0.8);
        var material = new THREE.MeshPhongMaterial({color: "yellow" })

        this.basicShape = new THREE.Mesh( geometry, material ); 

        this.group.add(this._copyFaces("purple"));

        this.group.add(this._copyFaces("blue", .5, .6));

    }    
}

export default Tetrahedron;