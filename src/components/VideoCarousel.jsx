import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { highlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#video', {
      // Desc-04 ↓
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
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

  useEffect(() => {
    // Desc-01 ↓
    loadedData.length > 3 && !isPlaying
      ? videoRef.current[videoId].pause()
      : startPlay && videoRef.current[videoId].play();
  }, [startPlay, videoId, isPlaying, loadedData]);

  //play videos - Desc-05 ↓
  const handleLoadedMetadata = (index, event) =>
    setLoadedData((pre) => [...pre, event]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Desc-02 ↓

      //animate videos
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},

        //keep track of all videos
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

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

      default:
        return video;
    }
  };

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
                  // Desc-05 ↓
                  onLoadedMetadata={(event) => handleLoadedMetadata(i, event)}
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
- animate the progress of the video duration

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
