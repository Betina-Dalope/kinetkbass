class Shape {
    constructor(shape, wireframe) {


        this._isHovering = false;
        this._aniTimeout = null;

        // the three js objects that make up the entity
        this.shape = shape;
        this.wireframe = wireframe;

        this.entity = this.wireframe; //entity is what we would reference in the component
        this.entity.add(this.shape);

        // set initial properties
        this.wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
        //this.shape.material.visible = false;

        this.defaultAni();

    }
    
    animate = () => {
        this.currentAniFunction();
    }



    defaultAni = () => {
        this._isHovering = false;
        clearTimeout( this._aniTimeout );
        this.currentAniFunction = this._slowSpin;

    }

    onHover = () => {
        if (!this._isHovering) {
            this._isHovering = true;
            this.currentAniFunction = this._fastSpin;
            this._aniTimeout = setTimeout(() => {
                this.currentAniFunction = this._haltSpin;
            }, 250)
        }
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
