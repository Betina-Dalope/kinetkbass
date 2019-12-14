import Shape from './shape.js';
import * as THREE from 'three';

export class Cube extends Shape {
    constructor() {
        //create cube
        
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

        var cube = new THREE.Mesh( geometry, material );

        // create wireframe
        var geo = new THREE.EdgesGeometry( cube.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x008000, linewidth: 3 } );
        var wireframe = new THREE.LineSegments( geo, mat );

        super(cube, wireframe);

    }    
}

export default Cube;