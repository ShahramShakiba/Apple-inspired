/* eslint-disable react/no-unknown-property */
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

      <Suspense fallback={<Html><div>Loading</div></Html>}>
        <Iphone />
      </Suspense>
    </View>
  );
};

export default ModelView;

/* <Html></Html>
In React Three Fiber, the <Html> component allows for the rendering of standard HTML elements within a Three.js scene. This feature enables developers to incorporate familiar web elements, such as divs, texts, images, or other HTML content, seamlessly into their 3D scenes.
*/