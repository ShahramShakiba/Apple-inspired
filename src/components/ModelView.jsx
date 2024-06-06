/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import * as THREE from 'three';
import { OrbitControls, View, PerspectiveCamera } from '@react-three/drei';
import Lights from './Lights';
import Iphone from './Iphone';
import Loader from './Loader';

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
        <Suspense fallback={<Loader />}>
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

/* getAzimuthalAngle()
The `getAzimuthalAngle` function specifically retrieves the azimuthal angle of the camera, which represents the horizontal angle of the camera relative to its target position.

In summary, `getAzimuthalAngle` in React Three Fiber enables you to retrieve the horizontal angle of the camera, offering insights into its positioning within a 3D environment. 
*/
