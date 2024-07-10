import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import Reticle from './Reticle';

const ARScene = () => {
  const sceneRef = useRef();
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20));
  const renderer = useRef();

  useEffect(() => {
    renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.xr.enabled = true;
    sceneRef.current.appendChild(renderer.current.domElement);

    document.body.appendChild(ARButton.createButton(renderer.current));

    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.current.add(ground);

    const animate = () => {
      renderer.current.setAnimationLoop(() => {
        renderer.current.render(scene.current, camera.current);
      });
    };

    animate();

    const onResize = () => {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={sceneRef} style={{ width: '100%', height: '100%' }}>
      <Reticle scene={scene.current} renderer={renderer.current} camera={camera.current} />
    </div>
  );
};

export default ARScene;
