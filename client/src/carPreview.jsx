import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';

export function RenderVehicle({vehicle}) {
    // This reference gives us direct access to the THREE.Mesh object
    //body.post.vehicle.vertices[0].x
    const ref = useRef();

    function createCubes() {
        return vehicle.locations.map((location, index) => {
            const z = location / (40 * 100) - 20; // subtract half the max editor size in the z direction
            const remaining = location % (40 * 100);
            const x = (remaining / 40) - 50; // subtract half the max editor size in the x direction
            const y = (remaining % 40) - 20; // subtract half the max editor size in the y direction
            return (
                <mesh
                    key={location}
                    position={[x, z, y]}
                    ref={ref}
                >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial 
                            color={new Color(vehicle.colors[index].r, vehicle.colors[index].g, vehicle.colors[index].b)}
                            transparent={vehicle.colors[index].a < 1}
                            opacity={vehicle.colors[index].a}
                        />
                </mesh>
            );
        });
    }

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (ref.current.rotation.y += delta));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <>
        <mesh
                    key={location}
                    position={[0, 0, 0]}
                    ref={ref}
                >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial 
                            color={"red"}
                        />
                </mesh>
            {createCubes()}
        </>
    );
}

