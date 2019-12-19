import Shape from './shape.js';
import * as THREE from 'three';

export class Icosahedron extends Shape {
    constructor() {

        super();
        
        var geometry = new THREE.IcosahedronGeometry(0.8);
        var material = new THREE.MeshBasicMaterial( { color: "blue" } );

        this.basicShape = new THREE.Mesh( geometry, material ); 


        this.group.add(this._copyFaces("green"));

        this.group.add(this._copyFaces("yellow", .5, .6));

        this.group.add(this.basicShape);

    }    
}

export default Icosahedron;