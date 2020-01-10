import Shape from './shape.js';
import * as THREE from 'three';

export class Icosahedron extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.IcosahedronGeometry( 0.6 );
        var material = new THREE.MeshPhongMaterial({color: "black" })

        this._basicShape = new THREE.Mesh( geometry, material ); 

        this.entity.add(this._basicShape);
        this.entity.position.set(-1,0,0);

        //this._showWireframe();

        setTimeout(() => {
            this.entity.position.set(-3,0,0);
            this._showWireframe();
        }, 5000)

    }
    
    animate = () => {
        //this._basicShape.rotation.x += .5;
    }
}

export default Icosahedron;