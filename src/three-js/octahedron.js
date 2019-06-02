import Shape from './shape.js';
import * as THREE from 'three';

class Octahedron extends Shape {
    constructor() {
        //create cube
        
        var geometry = new THREE.OctahedronGeometry(0.8);
        var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );

        var octahedron = new THREE.Mesh( geometry, material );;

        // create wireframe
        var geo = new THREE.EdgesGeometry( octahedron.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x800080, linewidth: 4 } );
        var wireframe = new THREE.LineSegments( geo, mat );

        super(octahedron, wireframe);

    }    
}

export default Octahedron;