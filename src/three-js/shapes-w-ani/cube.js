import Shape from './shape.js';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

export class Cube extends Shape {
    constructor() {
        
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var colors = { primary: "green", secondary: "purple" };
        super(geometry, colors);

        this.entity.position.set(0,0,0);

        //change inner light to a cube
        this._innerLight.geometry = geometry;
        this._innerLight.children[0].distance = 15;
        //this._innerLight.geometry = new THREE.SphereGeometry(1, 4, 4, 0, 6.3, 5.5, 6.3);

        // outer layers
        var geometry = new THREE.BoxGeometry( .5, .5, .5 );
        var material = new THREE.MeshPhongMaterial({color: "yellow" , side: THREE.DoubleSide});
        this._outerLayers.add(new THREE.Mesh( geometry, material ));
        var geometry = new THREE.IcosahedronGeometry( .2 );
        var material = new THREE.MeshPhongMaterial({color: "black" , side: THREE.DoubleSide});
        this._outerLayers.add(new THREE.Mesh( geometry, material ));
        var geometry = new THREE.BoxGeometry( .2, .8 , .8 );
        var material = new THREE.MeshPhongMaterial({color: "purple", side: THREE.DoubleSide });
        this._outerLayers.add(new THREE.Mesh( geometry, material ));




    }

    initAni = () => {

        this._reset();
        // 1. set point light color to white
        var originalColor = this._innerLight.material.color;
        this._innerLight.material.color = new THREE.Color("white");

        // 1. make inner light the only visible thing
        this._innerLight.scale.set(1, 1, 1);

        this._wireframe.visible = false;
        this._innerLight.material.opacity = 1;
        this._basicShape.visible = false;

        // 2. rotate really fast
        this._innerLight.rotation.y += .5;
        this._innerLight.rotation.z += .5;
        this.animate = () => {
            this._innerLight.rotation.x += .5;
            this._outerLayers.rotation.y += 0.025;
            this._outerLayers.rotation.z += 0.01;
        }

        TweenMax.delayedCall(4, () => {
            //this._wireframe.visible = true;
        });

        // 3. stop spinning and set to normal upright position and size
        TweenMax.delayedCall(6.5, () => {
            this._innerLight.rotation.y = 0;
            this._innerLight.rotation.z = 0;
            this._innerLight.rotation.x = 0;
            this.animate = function() {
                this._outerLayers.rotation.y += 0.025;
                this._outerLayers.rotation.z += 0.01;
            };
            //this._wireframe.visible = true;

            //this._innerLight.material.color = originalColor;
        })
    }

    mainMenu = () => {
        this._reset();
        this._basicShape.visible = true;
        this._innerLight.scale.set(1, 1, 1);
        this._innerLight.material.opacity = 1;
        this._wireframe.scale.set(.15,.15,.15);

        TweenMax.to( this._innerLight.material, 2, {opacity: 0});
        TweenMax.to(this._innerLight.scale, 3, {x: .15, y: .15, z: .15});
        TweenMax.to(this._wireframe.scale, 2, {x: 1, y: 1, z: 1}); 

        TweenMax.delayedCall(2, () => {
            
            
                        
        })
        
    }

    openAni = () => {

        super.openAni();
        //this._basicShape.visible = true;
        this._innerLight.material.opacity = 1;
        this._innerLight.scale.set(.15, .15, .15);

        
    }
}

export default Cube;