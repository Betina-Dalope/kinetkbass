import Shape from './shape.js';
import * as THREE from 'three';

export class Tetrahedron extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.TetrahedronGeometry( 0.8 );
        var material = new THREE.MeshPhongMaterial({color: "black" })

        this._basicShape = new THREE.Mesh( geometry, material ); 

        
        this.entity.position.set(-6,0,0);

        

        setTimeout(() => {
            this.entity.add(this._basicShape);
            this._showWireframe();
        }, 5000)

    }
    
    animate = () => {
        //this._basicShape.rotation.x += .5;
    }
}

export default Tetrahedron;