// src/components/ModelPlacement.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const placeModel = (scene, reticle, currentModel, setCurrentModel) => {
  const loader = new GLTFLoader();

  if (reticle.visible) {
    loader.load('./models/chair.glb', (gltf) => {
      if (currentModel) {
        scene.remove(currentModel);
      }
      const model = gltf.scene;
      model.position.setFromMatrixPosition(reticle.matrix);
      scene.add(model);
      setCurrentModel(model);
    });
  }
};
