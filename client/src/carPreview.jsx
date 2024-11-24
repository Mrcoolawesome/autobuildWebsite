import * as THREE from 'three';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export function RenderVehicle(vehicle) {
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [controls, setControls] = useState(null); 
    const canvasRef = useRef(null);
    const [renderer, setRenderer] = useState(null);

    function createScene() {
        const scene = new THREE.Scene();
        const light = new THREE.AmbientLight(0xFFFFFF, 100);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);
        setScene(scene);
    }

    function createCamera() {
        const width = 800;
        const height = 800;
        const camera = new THREE.PerspectiveCamera(75, width / height);
        camera.position.set(0, 10, 20);
        setCamera(camera);
        scene.add(camera);
        setScene(scene);
    }

    function addCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
        scene.add(cube);
    }

    function createRenderer() {
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.render(scene, camera);
        setRenderer(renderer);
    }

    function render() {
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
            setRenderer(renderer);
        }
    }

    // Start the animation loop
    function animate() {
        // console.log("running");
        if (scene && camera && controls !== null) {
            controls.update();
            setControls(controls); // update the state of the controls
            // render();
        }
        requestAnimationFrame(() => {
            render();
            animate();
            // console.log("running");
        });  // Request the next frame
    }

    // Set up controls once camera and scene are ready
    useEffect(() => {
        if (scene && camera && controls === null) {
            const canvas = canvasRef.current;
            const control = new OrbitControls(camera, canvas);
            control.target.set(0, 0, 0);
            control.update();
            setControls(control);
            console.log(controls);
        }
    }, [scene, camera]); // Avoid repeated control setup

    useEffect(() => {
        createScene();  // Create the scene when the component mounts
        if (scene && camera) ;
    }, []); // Empty dependency array ensures this runs once

    useEffect(() => {
        if (scene) {
            createCamera();  // Create the camera when the scene is available
        }
    }, [scene]); // Runs whenever `scene` changes

    useEffect(() => {
        if (scene && camera) {
            addCube();   // Add the cube to the scene when both scene and camera are available
            animate();    // Start rendering the scene
        }
    }, [scene, camera]);  // Runs whenever `scene` or `camera` changes

    useEffect(() => {
        if (scene && camera && controls && renderer === null) {
            createRenderer();
        }
        if (scene && camera) {
            animate();    // Start rendering the scene
        }
    }, [camera, scene, controls, renderer]);  // Runs whenever `scene` or `camera` changes

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '800px', height: '600px', display: 'block', margin: 'auto' }}
        />
    );
}