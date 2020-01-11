import * as THREE from 'three';
import { TweenMax } from 'gsap';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

class Shape {

    constructor() {

        this._basicShape = null;
        this._innerLight = null;
        this._outerLayers = new THREE.Group(); // the faces of the shape that open

        this.entity = new THREE.Group(); // use this to reference in react components
        //this.entity.add(this._innerLight);
        //this.entity.add(this._outerLayers);

    }

    _constructInnerLight = () => {
        //visual orb simulates a glow with the bloom effect, but the actual light is hidden inside it
        // the material is transparent but full opacity to allow light to pass through
        var geometry = new THREE.SphereGeometry(.15);
        var material = new THREE.MeshBasicMaterial({color: "white", transparent: true, opacity: 1});
        var visualOrb = new THREE.Mesh(geometry, material);

        var light = new THREE.PointLight( "white", 1, 100 );
        light.position.set( 0, 0, 0 );
        visualOrb.add( light );

        return visualOrb;
    }

    // cycle through inner light colors
    _cycleColors = () => {
    }

    // called in the scene's render loop and changed in the scene's global animation functions
    animate = () => {
    }

    // default init animation - gets overriden by children
    initAni = () => {
        this.entity.visible = false;
        TweenMax.delayedCall(5, () => {
            this.entity.visible = true; 
        })
    }

    goTo = () => {
        // 1. go to middle of shape
        // 2. rotate
        // 3. show content and text
    }


    _createWireframe = (COLOR = 0x00ff00 ) => {

        var facesGroup = new THREE.Group();
        var geometry = this._basicShape.geometry;
        for(var i in geometry.faces) {

            // var path = new THREE.CurvePath();
            // path.add( new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].b] ) )
            // path.add( new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].c] ) )
            // path.add( new THREE.LineCurve3( geometry.vertices[geometry.faces[i].b], geometry.vertices[geometry.faces[i].c] ) )
            //path.autoClose = true;
            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].b] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            facesGroup.add( mesh );

            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].b], geometry.vertices[geometry.faces[i].c] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR} );
            var mesh = new THREE.Mesh( tubegeometry, material );
            facesGroup.add( mesh );


        }
        
        return facesGroup;        
    }

}

export default Shape;
