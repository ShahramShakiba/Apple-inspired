import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import gsap from 'gsap';
import ModelView from './ModelView';
import { yellowImg } from '../utils';

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  //camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //keep track of the model - to animate its property
  const small = useRef(new THREE.Group());

  useGSAP(() => {}, [
    gsap.to('#heading', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }),
  ]);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
