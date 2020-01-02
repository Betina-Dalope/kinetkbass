import * as THREE from 'three';
import { Color } from 'three';

class Shape {

    constructor() {

        this._basicShape = null;
        this._innerLight = null;
        this._outerLayers = new THREE.Group(); // the faces of the shape that open

        this.entity = new THREE.Group(); // use this to reference in react components
        //this.entity.add(this._innerLight);
        //this.entity.add(this._outerLayers);

    }

    // cycle through inner light colors
    _cycleColors = () => {
    }

    // animate open the shape
    open = () => {

    }

    // animate close the shape
    close = () => {

    }

    goTo = () => {
        // 1. go to middle of shape
        // 2. rotate
        // 3. show content and text
    }

}

export default Shape;
