import * as THREE from 'three';
import { Color } from 'three';

class Shape {

    constructor() {

        this.innerLight = this._constructInnerLight();
        this.group = new THREE.Group();
        this.group.add(this.innerLight);


    }

    _constructInnerLight = () => {
        //visual orb simulates a glow with the bloom effect, but the actual light is hidden inside it
        // the material is transparent but full opacity to allow light to pass through
        var geometry = new THREE.SphereGeometry(.15);
        var material = new THREE.MeshBasicMaterial({color: "white", transparent: true, opacity: 1});
        var visualOrb = new THREE.Mesh(geometry, material);

        var light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 0, 0, 0 );
        visualOrb.add( light );

        return visualOrb;
    }
 
    _copyFacesHollow = (COLOR = 0x0F1052, DISTANCE_FROM_SHAPE = 0, SCALE = 1) => {
        var facesGroup = new THREE.Group();
        var geometry = this.basicShape.geometry;
        for(var i in geometry.faces) {


                var torusGeometry = new THREE.TorusGeometry( 1.5, .1, 3, 3 );
                var material = new THREE.MeshPhongMaterial( { color: COLOR } );
                var torus = new THREE.Mesh( torusGeometry, material );
    
                
                torus.lookAt(geometry.faces[i].normal);
                torus.rotation.z = Math.PI / 2;
                //torus.rotation.z = (geometry.faces[i].normal.y > 0) ? Math.PI / 1 : Math.PI / 2
                
                torus.position.set(
                    geometry.faces[i].normal.x * DISTANCE_FROM_SHAPE,
                    geometry.faces[i].normal.y * DISTANCE_FROM_SHAPE,
                    geometry.faces[i].normal.z * DISTANCE_FROM_SHAPE) //a child objects position is relative to the parent objects position
    
    
                torus.scale.set(SCALE, SCALE, SCALE);

                facesGroup.add( torus );


        }
        
        return facesGroup;
    }

    _copyFaces = (COLOR = 0x0F1052, DISTANCE_FROM_SHAPE = .2, SCALE = 1) => {
        var facesGroup = new THREE.Group();
        var geometry = this.basicShape.geometry;
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
