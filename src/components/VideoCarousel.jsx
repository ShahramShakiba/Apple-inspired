import { useRef, useState } from 'react';
import { highlightsSlides } from '../constants';

const VideoCarousel = () => {
 
  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              {/*======= Videos =======*/}
              <div className="w-full h-full overflow-hidden bg-black rounded-3xl flex-center">
                <video id="video" playsInline={true} preload="auto" muted>
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              {/*======= Text =======*/}
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCarousel;
