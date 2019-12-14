import Shape from './shape.js';
import * as THREE from 'three';

class Icosahedron extends Shape {
    constructor() {
        //create cube
        
        var geometry = new THREE.IcosahedronGeometry(0.8);
        var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );

        var icosahedron = new THREE.Mesh( geometry, material );;

        // create wireframe
        var geo = new THREE.EdgesGeometry( icosahedron.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 3 } );
        var wireframe = new THREE.LineSegments( geo, mat );

        super(icosahedron, wireframe);

    }    
}

export default Icosahedron;