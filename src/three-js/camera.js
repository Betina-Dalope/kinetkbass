import * as THREE from 'three';
import { TimelineLite, Expo } from 'gsap';

class Camera {

    constructor(scene) {
        this.entity = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);

        this.entity.position.set(-5, 0, 0);

        this.entity.lookAt(0,0,0); // for some reason this needs to go after it's added to a scene


        this.pivotPoint = new THREE.Object3D();
        this.pivotPoint.add(this.entity);
        scene.add(this.pivotPoint);
        this._initAni();
    }

    update = () => {
        this.entity.aspect = window.innerWidth / window.innerHeight;
        this.entity.updateProjectionMatrix();
    }

    _initAni = () => {

        var _this = this;
        new TimelineLite()
            .to(this.entity.position, 3, {x: -7, ease: Expo.easeIn})
            .to(this.entity.position, 5, {x: -.5, ease: Expo.easeOut })

            // this is to look at target while moving camera
            // .to(this.entity.position, 5, {x: -10, z: 5, onUpdate: () => {
            //     _this.entity.lookAt(0,0,0);
            // }})
            .add("spin out", "-=1")
            .set(this.pivotPoint.rotation, {y: -2}, "spin out")
            .to(this.entity.position, 4, {x: -10 }, "spin out")
            .to(this.pivotPoint.rotation, 10, {y: 4.5}, "spin out")
            .to(this.entity.position, 4, {z: 4, delay: -4})
            
    }

}

export default Camera;