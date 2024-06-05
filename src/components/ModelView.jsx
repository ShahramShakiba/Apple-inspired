import {
  Html,
  OrbitControls,
  View,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import Lights from './Lights';
import { Suspense } from 'react';
import Iphone from './Iphone';

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationSize,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2 border-red-500 w-full h-full ${
        index === 2
      } ? 'right-[-100%] : '`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      <Suspense fallback={<div>Loading</div>}>
        <Iphone />
      </Suspense>
    </View>
  );
};

export default ModelView;
