import * as THREE from 'three';
import { TweenMax } from 'gsap';

class Light {

    constructor(scene, camera) {
        this.ambientLight = new THREE.AmbientLight(0x404040, 1)
        scene.add(this.ambientLight);
        this.pointLight = new THREE.PointLight("yellow", .5, 2);
        camera.add(this.pointLight);
    }

    initAni = () => {
        this.ambientLight.color = new THREE.Color(0x404040);
        this.ambientLight.intensity = .1;
    }

    mainMenu = () => {
        this.ambientLight.color = new THREE.Color(0x404040);
        this.ambientLight.intensity = 1;
    }

    openAni = () => {
        console.log("blue");
        this.ambientLight.color = new THREE.Color("blue");
        this.ambientLight.intensity = 1;       
    }


}

export default Light;