import Shape from './shape.js';
import * as THREE from 'three';

class Tetrahedron extends Shape {
    constructor() {
        //create cube
        
        var geometry = new THREE.TetrahedronGeometry(0.9);
        var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );

        var tetrahedron = new THREE.Mesh( geometry, material );

        // create wireframe
        var geo = new THREE.EdgesGeometry( tetrahedron.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 3 } );
        var wireframe = new THREE.LineSegments( geo, mat );

        super(tetrahedron, wireframe);

    }    
}

export default Tetrahedron;