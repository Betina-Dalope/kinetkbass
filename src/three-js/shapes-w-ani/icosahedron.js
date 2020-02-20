import Shape from './shape.js';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

export class Icosahedron extends Shape {
    constructor() {

        var geometry = new THREE.IcosahedronGeometry( 0.6 );
        var colors = { primary: "blue", secondary: "orange" };
        super( geometry, colors );

        this.entity.position.set(-3,0,0);

        this._basicShape.children[0].material.color = new THREE.Color("#00013b")

        //this._outerLayers.add(this._copyFaces("#00013b", 0, .8));

    }

    initAni = () => {
        this.animate = () => {};
        this.entity.position.set(-1,0,0);
        this.entity.rotation.set(0,0,0);
        this._wireframe.visible = false;
        this._outerLayers.visible = false;
        this._basicShape.visible = true;
        this._innerLight.visible = false;
        TweenMax.delayedCall(5, () => {
            this.entity.position.set(-3,0,0);
            // this._wireframe.visible = true;
            // this._outerLayers.visible = true;

            this.mainMenu();
        })
    }

    mainMenu = () => {
        this.entity.position.set(-3,0,0);
        super.mainMenu();
    }
    
    
}

export default Icosahedron;