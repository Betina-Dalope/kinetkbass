import * as THREE from 'three';
import { TweenMax } from 'gsap';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

class Shape {

    constructor(geometry, colors) {

        var material_outer = new THREE.MeshPhongMaterial({color: "black", side: THREE.FrontSide })
        var material_inner = new THREE.MeshPhongMaterial({color: colors.primary, side: THREE.BackSide })

        this._basicShape = new THREE.Mesh( geometry, material_outer );
        this._basicShape.receiveShadow = true;
        this._basicShape.add( new THREE.Mesh( geometry, material_inner ) )

        this._innerLight = this._constructInnerLight(colors.secondary);
        this._outerLayers = new THREE.Group(); // the faces of the shape that open
        this._wireframe = this._createWireframe(colors.primary);

        this.entity = new THREE.Group(); // use this to reference in react components
        this.entity.add(this._basicShape);
        this.entity.add(this._innerLight);
        this.entity.add(this._outerLayers);
        this.entity.add(this._wireframe);

    }

    _constructInnerLight = (color) => {
        //visual orb simulates a glow with the bloom effect, but the actual light is hidden inside it
        // the material is transparent but full opacity to allow light to pass through
        var geometry = new THREE.SphereGeometry(.025);
        var material = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 1});
        var visualOrb = new THREE.Mesh(geometry, material);

        var light = new THREE.PointLight( color , 1, 1, 1 );
        light.position.set( 0, 0, 0 );
        light.castShadow = true;
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
        this._reset();
        this.animate = () => {};

        this.entity.visible = false;

        TweenMax.delayedCall(5, () => {
            this.mainMenu();
        })
    }

    mainMenu() {
        this._reset();

        this.animate = () => {}

        this._wireframe.traverse( function(child) {
            if (child.userData.faceNormal) {
                child.position.set( 0, 0, 0);
            } 
        });
    }

    openAni() {
        this._reset();
        this._basicShape.visible = false;

        // 1. increase position of all faces of wireframe so shape opens up
        var distance_from_shape = .20;

        this._wireframe.traverse( function(child) {
            if (child.userData.faceNormal) {

                TweenMax.to( child.position, 2, {
                    x: child.userData.faceNormal[0] * distance_from_shape,
                    y: child.userData.faceNormal[1] * distance_from_shape,
                    z: child.userData.faceNormal[2] * distance_from_shape,
                    yoyo: true,
                    repeat: -1
                })
            } 
        });

        var distance_from_shape = .5;
        this._outerLayers.traverse( function(child) {
            if (child.userData.faceNormal) {

                TweenMax.to( child.position, 2, {
                    x: child.userData.faceNormal[0] * distance_from_shape,
                    y: child.userData.faceNormal[1] * distance_from_shape,
                    z: child.userData.faceNormal[2] * distance_from_shape,
                    yoyo: true,
                    repeat: -1
                })
            } 
        });

 
        this.animate = () => {
            this._wireframe.rotation.x += .01;
            this._wireframe.rotation.y += .01;
            this._outerLayers.rotation.z -= .02;
            this._outerLayers.rotation.x -= .02;

            this.entity.rotation.y -= .02;
            this.entity.rotation.z += .02;
        }

    }

    goTo = () => {

        this._reset();
        this._basicShape.scale.set(1.8, 1.8, 1.8);

        //this._innerLight.material.opacity = 0;
        this._wireframe.scale.set(.3,.3,.3)

        this.animate = () => {
            this._wireframe.rotation.x += .001;
            this._wireframe.rotation.y += .001;
            this._outerLayers.rotation.z -= .02;
            this._outerLayers.rotation.x -= .02;

            this.entity.rotation.y -= .002;
            this.entity.rotation.z += .002;
        }
    }

    _reset = () => {
        this._basicShape.visible = true;
        this._basicShape.scale.set(1, 1, 1);
        this._basicShape.rotation.set(0,0,0);

        this._wireframe.visible = true;
        this._wireframe.scale.set(1,1,1);
        this._wireframe.rotation.set(0,0,0);

        this.entity.visible = true;
        this.entity.rotation.set(0,0,0);
    }


    _createWireframe = (COLOR = 0x00ff00, DISTANCE_FROM_SHAPE = 0, SCALE = 1 ) => {

        var allFaces = new THREE.Group();
        var geometry = this._basicShape.geometry;
        for(var i in geometry.faces) {



            var face = new THREE.Group();

            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].b] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            face.add( mesh );

            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].b], geometry.vertices[geometry.faces[i].c] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            face.add( mesh );

            var path = new THREE.LineCurve3( geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].c] );
            var tubegeometry = new THREE.TubeBufferGeometry( path, 1, .02, 3, false );
            var material = new THREE.MeshPhongMaterial( { color: COLOR } );
            var mesh = new THREE.Mesh( tubegeometry, material );
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            face.add( mesh );

            face.scale.set(SCALE, SCALE, SCALE);

            // 2. set user data so you can calculate open position
            face.userData.faceNormal = geometry.faces[i].normal.toArray();

            face.position.set(
                geometry.faces[i].normal.x * DISTANCE_FROM_SHAPE,
                geometry.faces[i].normal.y * DISTANCE_FROM_SHAPE,
                geometry.faces[i].normal.z * DISTANCE_FROM_SHAPE)

            allFaces.add( face );


        }

        allFaces.castShadow = true; // does this even work?
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

            plane.userData.faceNormal = geometry.faces[i].normal.toArray();

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
