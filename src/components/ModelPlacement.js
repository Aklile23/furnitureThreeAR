// src/components/ModelPlacement.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const placeModel = (scene, reticle, modelPath, currentModel, setCurrentModel) => {
  const loader = new GLTFLoader();

  if (reticle.visible) {
    const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.setFromMatrixPosition(reticle.matrix);
    scene.add(cube);

    loader.load(modelPath, (gltf) => {
      if (currentModel) {
        scene.remove(currentModel);
      }
      const model = gltf.scene;
      model.position.copy(reticle.position);
      scene.add(model);
      setCurrentModel(model);
    });
  }
};
