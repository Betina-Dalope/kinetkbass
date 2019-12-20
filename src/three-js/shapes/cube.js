import Shape from './shape.js';
import * as THREE from 'three';

export class Cube extends Shape {
    constructor() {
        
        
        super();
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial({color: "yellow" })

        this.basicShape = new THREE.Mesh( geometry, material ); 

        this.group.add(this._copyFaces("teal"));

        this.group.add(this._copyFaces("red", .5, .6));


        //uncomment to change the light

        // this.innerLight.material.color = new THREE.Color(0x399ff14);
        // this.innerLight.children[0].color = new THREE.Color(0x399ff14);

        console.log(this.innerLight)


        //uncommend for more intricate shapes

        var geometry = new THREE.IcosahedronGeometry(0.8);
        var material = new THREE.MeshBasicMaterial( { color: "blue" } );

        this.basicShape = new THREE.Mesh( geometry, material );
        this.group.add(this._copyFaces("blue", .4, .7));

        this.group.add(this._copyFaces("yellow", 6, .3));

    }    
}

export default Cube;