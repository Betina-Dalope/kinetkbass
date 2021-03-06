import Shape from './shape.js';
import * as THREE from 'three';

export class Octahedron extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.OctahedronGeometry(0.8);
        var material = new THREE.MeshPhongMaterial({color: "yellow" })

        this.basicShape = new THREE.Mesh( geometry, material ); 

        // this.group.add(this._copyFaces("purple"));

        this.group.add(this._copyFaces("green", .1, .6));
        
        this.group.add(this._copyFacesHollow("darkgreen", 0, .2));

    }    
}

export default Octahedron;