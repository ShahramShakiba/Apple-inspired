import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { highlightsSlides } from '../constants';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    //if we came to the end & not playing then pause it
    loadedData.length > 3 && !isPlaying
      ? videoRef.current[videoId].pause()
      : startPlay && videoRef.current[videoId].play();
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      //animate the progress of the video duration

      //animate videos
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},

        //keep track of all videos
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              {/*======= Videos =======*/}
              <div className="w-full h-full overflow-hidden bg-black rounded-3xl flex-center">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                >
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

/* ============ Description ===========
* playsInline={true}:
- the video should play inline rather than in fullscreen mode on supported devices.

* preload="auto":
- the video should be preloaded for optimal playback performance.

* ref={(el) => (videoRef.current[i] = el)}:
- we are finding a specific index in the videoRef-array and setting it to this current video element

* onPlay={() => {
    setVideo((prevVideo) => ({ 
      ...prevVideo,
      isPlaying: true,
    }));
  }}
  
- to ensure immutability and avoid directly mutating state.

- when the video starts playing, this code snippet updates the video state to indicate that it is currently playing. 
- This mechanism allows for dynamic changes in the video player interface or behavior based on its playback status.
*/
