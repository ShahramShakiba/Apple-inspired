import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { highlightsSlides } from '../constants';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pauseImg, playImg, replayImg } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]); //container of progress
  const videoDivRef = useRef([]); //container of dot

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  //=======playing the videos
  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.to('#video', {
      // Desc-04 ↓
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none', // Desc-06 ↓
      },

      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  //=======playing the videos
  useEffect(() => {
    // Desc-01 ↓
    loadedData.length > 3 && !isPlaying
      ? videoRef.current[videoId].pause()
      : startPlay && videoRef.current[videoId].play();
  }, [startPlay, videoId, isPlaying, loadedData]);

  //=======Track the progress of the videos
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Desc-02 ↓
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // Desc-07 ↓
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? '10vw' //mobile
                  : window.innerWidth < 1200
                  ? '10vw' //tablet
                  : '4vw', //laptop
            });

            //background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: '#70749c',
            });
          }
        },

        // Desc-08 ↓
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              // Desc-09 ↓
              width: '12px',
            });

            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      //modify how long animation last
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker is update the progress-bar
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  //handle Progression Tracking
  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((pre) => ({
          ...pre,
          isEnd: true,
          videoId: i + 1,
        }));
        break;

      case 'video-last':
        setVideo((pre) => ({
          ...pre,
          isLastVideo: true,
        }));
        break;

      case 'video-reset':
        setVideo((pre) => ({
          ...pre,
          isLastVideo: false,
          videoId: 0,
        }));
        break;

      case 'play':
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;

      case 'pause':
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };

  //=======playing videos - Desc-05 ↓
  const handleLoadedMetadata = (i, event) =>
    setLoadedData((pre) => [...pre, event]);

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-20">
            <div className="video-carousel_container">
              {/*======= Videos =======*/}
              <div className="w-full h-full overflow-hidden bg-black rounded-3xl flex-center">
                <video
                  id="video"
                  className={`${
                    list.id === 2 && 'translate-x-44'
                  } pointer-events-none`}
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
                  // Desc-05 ↓
                  onLoadedMetadata={(event) => handleLoadedMetadata(i, event)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last')
                  }
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

      {/*====== Progression Tracking =======*/}
      <div className="relative mt-10 flex-center">
        <div className="py-5 bg-gray-300 rounded-full flex-center px-7 backdrop:">
          {/* Desc-03 ↓ */}
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative w-3 h-3 mx-2 bg-gray-200 rounded-full cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        {/*======= Play, Replay, Pause =======*/}
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={
              isLastVideo
                ? 'replay-icon'
                : !isPlaying
                ? 'play-icon'
                : 'pause-icon'
            }
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;

/* ============ Description ===========
* Desc-01
- if we came to the end & not playing then pause the video

* Desc-02 
- animate the progress of the video duration - animation to move the indicator

* Desc-03
- we get each video, nut we don't need to do anything with it, so we can just call it "_"

* Desc-04
- "scrollTrigger": Once the #video is on the view trigger it

* Desc-05 
- "onLoadedMetadata": this will get trigger with the event once the "metadata" of the video has loaded
- once it got data, we get "event", call handleLoadedMetadata and pass "index" and "event"

- this handler "onLoadedMetadata" will call "handleLoadedMetadata" and in return call our state-setter "setLoadedData" and once it's in there will call this useEffect:
useEffect(() => {
    loadedData.length > 3 && !isPlaying
      ? videoRef.current[videoId].pause()
      : startPlay && videoRef.current[videoId].play();
  }, [startPlay, videoId, isPlaying, loadedData]);

  - and this useEffect will trigger video play


* Desc-06 
- 'restart none none none' means that when the trigger is activated, the animation will restart from the beginning and will not be affected by any toggling actions in any direction. 
- This ensures that the animation consistently restarts when triggered without any additional effects.

* Desc-07 
- get the progress of the video * 100 to get the percent

* Desc-08
- keep track of all videos duration and modify the duration of the progress to be exactly as the duration of the videos
- when the video is ended, replace the progress bar with the indicator and change the background color

* Desc-09 
- get back to a dot after completing


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
