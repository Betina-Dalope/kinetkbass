class Shape {
    constructor(shape, wireframe) {
        this.shape = wireframe;
        this.wireframe = wireframe;

        this.wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
        //this.shape.add( this.wireframe );
    }
    
    animate = () => {
        this.shape.rotation.x += 0.01;
        this.shape.rotation.y += 0.01;
    }
}

export default Shape;
