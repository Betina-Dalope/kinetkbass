import * as THREE from 'three';
//import { EffectComposer, RenderPass } from "postprocessing";
import { UnrealBloomPass, EffectComposer, RenderPass } from 'three-full'

function vertexShader() {
    return `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() 
        {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `
}

function fragmentShader() {
    return `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }    
    `
}

function glowTest1(scene, camera) {
    var sphereGeom = new THREE.SphereGeometry(.8, 15, 15);
    var moonMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 });
    var moon = new THREE.Mesh(sphereGeom, moonMaterial);
    moon.position.set(0,0,0);
    scene.add(moon);
    //create custom material from the shader code above
    //that is within specially labeled script tags
    var customMaterial = new THREE.ShaderMaterial( 
    {
        uniforms: 
        { 
            "c":   { type: "f", value: 0 },
            "p":   { type: "f", value: 6 },
            glowColor: { type: "c", value: new THREE.Color(0xffff00) },
            viewVector: { type: "v3", value: camera.position }
        },
        vertexShader:   vertexShader(),
        fragmentShader: fragmentShader(),
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    }   );
        
   var moonGlow = new THREE.Mesh( sphereGeom.clone(), customMaterial.clone() );
    moonGlow.position.set(0,0,0);
    moonGlow.scale.multiplyScalar(1.6);
    scene.add( moonGlow );

    // !! also add light to material

    var cylinderGeometry = new THREE.CylinderGeometry(.2, .2, 1);
    var cylinderMaterial = new THREE.MeshBasicMaterial( { color: 0x008000 });
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(-3, 0, 0);
    scene.add( cylinder );

    var cylinderGlowMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: 
            { 
                "c":   { type: "f", value: 0 },
                "p":   { type: "f", value: 3 },
                glowColor: { type: "c", value: new THREE.Color(0x008000) },
                viewVector: { type: "v3", value: camera.position }
            },
            vertexShader:   vertexShader(),
            fragmentShader: fragmentShader(),
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        }   );


    var cylinderGlow = new THREE.Mesh( cylinderGeometry.clone(), cylinderGlowMaterial.clone() );
    cylinderGlow.position.set(-3,0, 0);
    cylinderGlow.scale.multiplyScalar(1.3);
    scene.add( cylinderGlow );
}

export default function Prototypes(scene, camera, renderer) {
    glowTest1(scene, camera)
}