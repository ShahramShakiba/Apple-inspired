import { Html } from '@react-three/drei';

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <div className="w-[10vw] h-[10vh] rounded-full">Loading...</div>
      </div>
    </Html>
  );
};

export default Loader;

/* <Html></Html>
In React Three Fiber, the <Html> component allows for the rendering of standard HTML elements within a Three.js scene. This feature enables developers to incorporate familiar web elements, such as divs, texts, images, or other HTML content, seamlessly into their 3D scenes.
*/
