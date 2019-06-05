class Shape {
    constructor(shape, wireframe) {
        this.shape = shape;
        this.wireframe = wireframe;

        this.entity = this.wireframe;
        this.entity.add(this.shape);

        this.wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

        this.defaultAni();

        this.shape.visible = false;

    }
    
    animate = () => {
        this.currentAniFunction();
    }



    defaultAni = () => {
        this.currentAniFunction = this._slowSpin;
    }

    onHover = () => {
        this.currentAniFunction = this._fastSpin;
        setTimeout(() => {
            this.currentAniFunction = this._haltSpin;
        }, 500)
        
    }


    // helper animations
    _slowSpin = () => {
        this.entity.rotation.x += 0.01;
        this.entity.rotation.y += 0.01;
    }

    _fastSpin = () => {
        this.entity.rotation.x += 1;
        this.entity.rotation.y += 1;        
    }

    _haltSpin = () => {
    }
}

export default Shape;
