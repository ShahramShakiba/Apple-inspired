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
      delay: 1.5,
    });
  }, []);

  return (
    <section className="relative w-full bg-black nav-height">
      <div className="flex flex-col w-full h-5/6 flex-center">
        <p id="hero" className="hero-title">
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
    </section>
  );
};

export default Hero;
