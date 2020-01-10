import * as THREE from 'three';
import { TimelineLite } from 'gsap';

class Light {

    constructor(scene, camera) {
        this.ambientLight = new THREE.AmbientLight("white", .5)
        scene.add(this.ambientLight);
        this.pointLight = new THREE.PointLight("blue", .5, 2);
        camera.add(this.pointLight);
    }


}

export default Light;