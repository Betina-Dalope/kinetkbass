import Shape from './shape.js';
import * as THREE from 'three';

export class Cube extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial({color: "white" })

        this._basicShape = new THREE.Mesh( geometry, material ); 
        this._basicShape.rotation.y += .5;
        this._basicShape.rotation.z += .5;

        this.entity.add(this._basicShape);

    }
    
    animate = () => {
        this._basicShape.rotation.x += .5;
    }
}

export default Cube;