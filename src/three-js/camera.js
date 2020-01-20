import * as THREE from 'three';
import { TimelineLite, Expo } from 'gsap';

class Camera {

    constructor(scene) {
        this.entity = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);

        this.entity.position.set(-5, 0, 0);

        this.entity.lookAt(0,0,0); // for some reason this needs to go after it's added to a scene


        this._pivotPoint = new THREE.Object3D(); // use this to rotate the camera around objects or the scene
        this._pivotPoint.add(this.entity);
        scene.add(this._pivotPoint);
    }

    update = () => {
        this.entity.aspect = window.innerWidth / window.innerHeight;
        this.entity.updateProjectionMatrix();
    }

    initAni = () => {

        this.entity.position.set(-5, 0, 0);
        this._pivotPoint.rotation.set(0,0,0);

        new TimelineLite()
            .to(this.entity.position, 3, {x: -7, ease: Expo.easeIn})
            .to(this.entity.position, 5, {x: -1, ease: Expo.easeOut })

            // this is to look at target while moving camera
            // .to(this.entity.position, 5, {x: -10, z: 5, onUpdate: () => {
            //     _this.entity.lookAt(0,0,0);
            // }})
            .add("spin out", "-=1")
            .set(this._pivotPoint.rotation, {y: -2}, "spin out")
            .to(this.entity.position, 4, {x: -15 }, "spin out")
            .to(this._pivotPoint.rotation, 10, {y: 4.6}, "spin out")
            .to(this.entity.position, 5, {z: 4.5, delay: -5, ease: Expo.easeOut})
            
    }

    mainMenu = () => {
        this.entity.position.set(-15, 0, 4.5);
        this._pivotPoint.rotation.set(0,4.6,0);
    }

    openAni = () => {
        this.entity.position.set(-15, 0, 4.5);
        this._pivotPoint.rotation.set(0,4.6,0);       
    }

}

export default Camera;