/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import {
  Html,
  OrbitControls,
  View,
  PerspectiveCamera,
} from '@react-three/drei';
import Lights from './Lights';
import Iphone from './Iphone';

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false} //disable moving around
        rotateSpeed={0.5}
        target={new THREE.Vector3(0, 0, 0)} //position at the center
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())} //get the angle of the camera to know where we are
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large'`}
        position={[0, 0, 0]}
      >
        <Suspense
          fallback={
            <Html>
              <div>Loading</div>
            </Html>
          }
        >
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;

/* <Html></Html>
In React Three Fiber, the <Html> component allows for the rendering of standard HTML elements within a Three.js scene. This feature enables developers to incorporate familiar web elements, such as divs, texts, images, or other HTML content, seamlessly into their 3D scenes.
*/

/* getAzimuthalAngle()
The `getAzimuthalAngle` function specifically retrieves the azimuthal angle of the camera, which represents the horizontal angle of the camera relative to its target position.

In summary, `getAzimuthalAngle` in React Three Fiber enables you to retrieve the horizontal angle of the camera, offering insights into its positioning within a 3D environment. 
*/
