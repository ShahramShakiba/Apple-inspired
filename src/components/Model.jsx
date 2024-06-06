import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import gsap from 'gsap';
import ModelView from './ModelView';
import { yellowImg } from '../utils';
import { models, sizes } from '../constants';
import { animateWithGsapTimeline } from '../utils/animations';

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  //"Camera" control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //keep track of the "Model" - to animate its property
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //"Rotation"
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const timeLine = gsap.timeline();

  useEffect(() => {
    if (size === 'large') {
      animateWithGsapTimeline(
        timeLine,
        small,
        smallRotation,
        '#view1',
        '#view2',
        {
          transform: 'translateX(-100%)',
          duration: 2,
        }
      );
    }

    if (size === 'small') {
      animateWithGsapTimeline(
        timeLine,
        large,
        largeRotation,
        '#view2',
        '#view1',
        {
          transform: 'translateX(0)',
          duration: 2,
        }
      );
    }
  }, [size]);
  useGSAP(() => {
    gsap.to('#heading', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    });
  }, []);

  useEffect(() => {
    // Set the pixel ratio
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    }
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>
          {/*======= Colors & Sizes =======*/}
          <div className="w-full mx-auto">
            <p className="mb-5 text-sm font-light text-center">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 mx-2 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
