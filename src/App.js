import * as THREE from 'three';
import React, { useState, useCallback, useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';

import './styles.css';
import * as meshline from './MeshLine';
import { Effects } from './Effects';
import { Music } from './Music';
import { Scene } from './Scene';

extend(meshline);

export function App() {
  const [down, set] = useState(false);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={() => set(false)}
      onMouseDown={() => set(true)}
      style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#020207'));
        }}>
        <Music />
        <axesHelper />
        <Scene mouse={mouse} isMobile={isMobile} />
        <Effects down={down} />
      </Canvas>
    </div>
  );
}
