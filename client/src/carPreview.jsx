import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Matrix4, Color } from 'three';

export function RenderVehicle({ vehicle }) {
    const meshRef = useRef();
    const [mouseDown, setMouseDown] = useState(false);

    // Number of instances
    const count = vehicle.locations.length;

    // Use matrix to position each instance
    const tempMatrix = new Matrix4();

    // Create the `InstancedMesh` on the first render
    useEffect(() => {
        if (meshRef.current) {
            for (let i = 0; i < count; i++) {
                const location = vehicle.locations[i];
                const z = location / (40 * 100) - 20;
                const remaining = location % (40 * 100);
                const x = (remaining / 40) - 50;
                const y = (remaining % 40) - 20;

                // Set position using matrix
                tempMatrix.setPosition(x, z, y);
                meshRef.current.setMatrixAt(i, tempMatrix);

                // Set color
                const color = new Color().setRGB(vehicle.colors[i].r, vehicle.colors[i].g, vehicle.colors[i].b);
                meshRef.current.setColorAt(i, color);
            }

            // Update the mesh instance
            meshRef.current.instanceMatrix.needsUpdate = true;
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [count, vehicle.locations, vehicle.colors]);

    // Optionally animate the instances (e.g., rotation)
    useFrame(() => {
        if (meshRef.current && !mouseDown) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <instancedMesh onPointerDown={(e) => setMouseDown(e.target)}
            ref={meshRef}
            args={[null, null, count]} // Pass geometry, material, and instance count
        >
            {/* Geometry for instances */}
            <boxGeometry args={[1, 1, 1]} />
            {/* Material for instances */}
            <meshStandardMaterial />
            {/* <Wireframe/> */}
        </instancedMesh>
    );
}
