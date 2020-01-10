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

        this.entity.position.set(0,0,0);

        this.animate = this.rotate;
        setTimeout(() =>{
            this._basicShape.rotation.y = 0;
            this._basicShape.rotation.z = 0;
            this._basicShape.rotation.x= 0;
            this.animate = function() {};
        }, 5000)

        // inside stuff
        var geometry = new THREE.BoxGeometry( .5, .5, .5 );
        var material = new THREE.MeshPhongMaterial({color: "blue" , side: THREE.DoubleSide});
        this.entity.add(new THREE.Mesh( geometry, material ));
        var geometry = new THREE.IcosahedronGeometry( .6 );
        var material = new THREE.MeshPhongMaterial({color: "purple" , side: THREE.DoubleSide});
        this.entity.add(new THREE.Mesh( geometry, material ));
        var geometry = new THREE.IcosahedronGeometry( .4 );
        var material = new THREE.MeshPhongMaterial({color: "green", side: THREE.DoubleSide });
        this.entity.add(new THREE.Mesh( geometry, material ));


    }

    rotate = () => {
        this._basicShape.rotation.x += .5;
    }
}

export default Cube;