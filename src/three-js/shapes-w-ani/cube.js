import Shape from './shape.js';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

export class Cube extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial({color: "white" })

        this._basicShape = new THREE.Mesh( geometry, material ); 

        this.entity.add(this._basicShape);

        this.entity.position.set(0,0,0);

        // inside stuff
        var geometry = new THREE.BoxGeometry( .5, .5, .5 );
        var material = new THREE.MeshPhongMaterial({color: "blue" , side: THREE.DoubleSide});
        this.entity.add(new THREE.Mesh( geometry, material ));
        var geometry = new THREE.IcosahedronGeometry( .5 );
        var material = new THREE.MeshPhongMaterial({color: "purple" , side: THREE.DoubleSide});
        this.entity.add(new THREE.Mesh( geometry, material ));
        var geometry = new THREE.IcosahedronGeometry( .4 );
        var material = new THREE.MeshPhongMaterial({color: "green", side: THREE.DoubleSide });
        this.entity.add(new THREE.Mesh( geometry, material ));


    }

    initAni = () => {

        // 1. rotate really fast
        this._basicShape.rotation.y += .5;
        this._basicShape.rotation.z += .5;
        this.animate = () => {
            this._basicShape.rotation.x += .5;
        }

        // 2. stop spinning and set to normal upright position
        TweenMax.delayedCall(5, () => {
            this._basicShape.rotation.y = 0;
            this._basicShape.rotation.z = 0;
            this._basicShape.rotation.x= 0;
            this.animate = function() {};
        })
    }
}

export default Cube;