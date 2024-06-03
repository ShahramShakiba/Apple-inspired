import { useEffect } from 'react';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  //dynamically modify the video depending on the width of the screen
  const handleVideoSrcSet = () => {
    setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  };

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    //in "react" you need to clean up event-listeners
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to('#hero', {
      opacity: 1,
      y: 0,
      delay: 2,
      duration: 1,
    });

    gsap.to('#cta', {
      opacity: 1,
      y: -50,
      delay: 2,
      duration: 1,
    });
  }, []);

  return (
    <section className="relative w-full bg-black nav-height">
      <div className="flex flex-col w-full h-5/6 flex-center">
        <p id="hero" className="-translate-y-20 hero-title">
          iPhone 15 Pro
        </p>

        <div>
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc} //re-render the video when the source changes
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center translate-y-20 opacity-0"
      >
        <a href="#highLights" className="btn">
          Buy
        </a>
        <p className="text-xl font-normal">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
