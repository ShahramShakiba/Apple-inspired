import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { watchImg } from '../utils';
import VideoCarousel from './VideoCarousel';

const HighLights = () => {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      y: 0,
      duration: 0.7,
    });

    gsap.to('.link', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <section
      id="highLights"
      className="w-screen h-full overflow-hidden common-padding bg-zinc"
    >
      <div className="screen-max-width">
        {/*======= Header =======*/}
        <div className="items-end justify-between w-full mb-12 md:flex">
          <h1 id="title" className="section-heading">
            Get The HighLights.
          </h1>

          <div className="flex flex-wrap items-end gap-5 ">
            <p className="link">
              Watch The Film
              <img src={watchImg} alt="Play-icon" className="ml-2 " />
            </p>

            <p className="link">
              Watch The Event
              <img src={watchImg} alt="Play-icon" className="ml-2" />
            </p>
          </div>
        </div>

        {/*======= Video-Slider =======*/}
        <VideoCarousel />
      </div>
    </section>
  );
};

export default HighLights;
