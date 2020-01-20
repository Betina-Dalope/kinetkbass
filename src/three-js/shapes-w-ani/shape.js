import * as THREE from 'three';
import { TweenMax } from 'gsap';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

class Shape {

    constructor() {

        this._basicShape = null;
        this._innerLight = this._constructInnerLight();
        this._outerLayers = new THREE.Group(); // the faces of the shape that open

        this.entity = new THREE.Group(); // use this to reference in react components
        this.entity.add(this._innerLight);
        this.entity.add(this._outerLayers);

    }

    _constructInnerLight = () => {
        //visual orb simulates a glow with the bloom effect, but the actual light is hidden inside it
        // the material is transparent but full opacity to allow light to pass through
        var geometry = new THREE.SphereGeometry(.15);
        var material = new THREE.MeshBasicMaterial({color: "white", transparent: true, opacity: 1});
        var visualOrb = new THREE.Mesh(geometry, material);

        var light = new THREE.PointLight( "white", 1, 100 );
        light.position.set( 0, 0, 0 );
        //visualOrb.add( light );

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

    mainMenu = () => {
        this.entity.visible = true;
    }

    openAni = () => {

    }

    goTo = () => {
        // 1. go to middle of shape
        // 2. rotate
        // 3. show content and text
    }


    _createWireframe = (COLOR = 0x00ff00, DISTANCE_FROM_SHAPE = 0, SCALE = 1 ) => {

        var allFaces = new THREE.Group();
        var geometry = this._basicShape.geometry;
        for(var i in geometry.faces) {

            var face = new THREE.Group();

            // var path = new THREE.CurvePath();
            // path.add( new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].b] ) )
            // path.add( new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].c] ) )
            // path.add( new THREE.LineCurve3( geometry.vertices[geometry.faces[i].b], geometry.vertices[geometry.faces[i].c] ) )
            //path.autoClose = true;
            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].b] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            face.add( mesh );

            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].b], geometry.vertices[geometry.faces[i].c] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            face.add( mesh );

            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].c] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            face.add( mesh );

            face.scale.set(SCALE, SCALE, SCALE);

            face.position.set(
                geometry.faces[i].normal.x * DISTANCE_FROM_SHAPE,
                geometry.faces[i].normal.y * DISTANCE_FROM_SHAPE,
                geometry.faces[i].normal.z * DISTANCE_FROM_SHAPE)

            allFaces.add( face );


        }
        
        return allFaces;        
    }

    _copyFaces = (COLOR = 0x0F1052, DISTANCE_FROM_SHAPE = .2, SCALE = 1) => {
        var facesGroup = new THREE.Group();
        var geometry = this._basicShape.geometry;
        for(var i in geometry.faces) {


            // copy the face and create a custom geometry
            // if you add all the vertices of the  face to a geometry, it copies the face
            var customGeometry = new THREE.Geometry();
            customGeometry.vertices.push(
                geometry.vertices[geometry.faces[i].a], //geometry.faces[i].a returns an index of a vertex
                geometry.vertices[geometry.faces[i].b],
                geometry.vertices[geometry.faces[i].c],
                new THREE.Vector3(0,0,0),
            )

            // you must create your own faces if you make a custom geometry
            customGeometry.faces.push(
                new THREE.Face3( 0, 1, 2 ), // these numbers are just labels for a every vertex  -- play connect the dots
                new THREE.Face3( 0, 2, 3 ),
                new THREE.Face3( 0, 1, 3 ),
                new THREE.Face3( 1, 2, 3 ),
            );

            // this is necessary so that the geometry can reflect light.  otherwise the material will render as black (unless it is a basic material)
            customGeometry.computeFaceNormals();
            customGeometry.computeVertexNormals();


            var customMaterial = new THREE.MeshPhongMaterial( {color: COLOR, side: THREE.DoubleSide} );

            var plane = new THREE.Mesh( customGeometry , customMaterial);

            plane.position.set(
                geometry.faces[i].normal.x * DISTANCE_FROM_SHAPE,
                geometry.faces[i].normal.y * DISTANCE_FROM_SHAPE,
                geometry.faces[i].normal.z * DISTANCE_FROM_SHAPE) //a child objects position is relative to the parent objects position

            
               
            plane.scale.set(SCALE, SCALE, SCALE);
            facesGroup.add( plane );
        }
        
        return facesGroup;
    }

}

export default Shape;
