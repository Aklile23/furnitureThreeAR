import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Reticle = ({ scene, renderer, camera }) => {
  const reticleRef = useRef();

  useEffect(() => {
    if (!renderer || !camera) return;

    const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32);
    const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.rotation.x = -Math.PI / 2;
    reticle.visible = false;
    reticleRef.current = reticle;
    scene.add(reticle);

    const hitTestSourceRequested = false;
    let hitTestSource = null;
    let localSpace = null;

    const onXRFrame = (time, frame) => {
      const session = renderer.xr.getSession();
      if (session) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const viewerPose = frame.getViewerPose(referenceSpace);
        if (viewerPose) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);
          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            const hitPose = hit.getPose(localSpace);

            reticle.visible = true;
            reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z);
            reticle.updateMatrixWorld(true);
          } else {
            reticle.visible = false;
          }
        }
      }
      renderer.setAnimationLoop(onXRFrame);
    };

    renderer.xr.addEventListener('sessionstart', async (event) => {
      const session = renderer.xr.getSession();
      const referenceSpace = renderer.xr.getReferenceSpace();
      localSpace = await session.requestReferenceSpace('viewer');
      hitTestSource = await session.requestHitTestSource({ space: localSpace });

      session.addEventListener('end', () => {
        hitTestSource = null;
        localSpace = null;
      });

      renderer.setAnimationLoop(onXRFrame);
    });

    return () => {
      if (reticle) scene.remove(reticle);
      renderer.setAnimationLoop(null);
    };
  }, [scene, renderer, camera]);

  return null;
};

export default Reticle;
