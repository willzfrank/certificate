import { motion, useAnimation } from 'framer-motion';
import { clamp, getTime as formatTime } from 'app/utils';
import * as React from 'react';
import styles from './Video.module.css';

interface VideoPlayerProps {
  src: string | { src: string; type: string }[];
  title?: string;
  description?: string;
  posterUrl?: string;
  subtitleUrl?: string;
  className?: string;
  shouldShowLoader?: boolean;
  onVideoEnded?: () => void;
}

interface VideoDetailsType {
  src: VideoPlayerProps['src'];
  duration: number;
  currentTime: number;
  isPIP: boolean;
  isFullScreen: boolean;
  volume: number;
  playState: 'playing' | 'paused' | 'loading' | 'firstloaded';
  loaded: boolean;
}

const VideoPlayer = function (props: VideoPlayerProps): JSX.Element {
  const [videoDetails, setVideoDetails] = React.useState<VideoDetailsType>({
    src: props.src,
    duration: 0.001,
    currentTime: 0,
    isPIP: false,
    isFullScreen: false,
    volume: 1,
    playState: 'loading',
    loaded: false,
  });

  const previousAnimationLoadingStateRef = React.useRef<
    VideoDetailsType['playState'] | null
  >(null);

  const videoContainerElementRef = React.useRef<HTMLDivElement>(null);
  const videoElementRef = React.useRef<HTMLVideoElement>(null);

  const backwardAnimationControl = useAnimation();
  const forwardAnimationControl = useAnimation();
  const playAnimationControl = useAnimation();

  const [shouldAutoPlay, setAutoPlay] = React.useState(false);
  const [showVolumeControl, setShowVolumeControl] = React.useState(false);
  const [isFocused, setFocused] = React.useState<boolean>(true);

  const SECONDS_DELTA = 10;
  const VOLUME_DELTA = 0.1;

  const forwards = function () {
    if (videoElementRef.current)
      videoElementRef.current.currentTime = clamp(
        videoDetails.currentTime,
        videoDetails.duration,
        videoDetails.currentTime + SECONDS_DELTA
      );

    forwardAnimationControl.set({
      opacity: 1,
      scale: 0.5,
    });

    forwardAnimationControl.start({
      opacity: 0,
      scale: 1,
      transition: { duration: 0.7 },
    });
  };

  const backwards = function () {
    if (videoElementRef.current)
      videoElementRef.current.currentTime = clamp(
        0,
        videoDetails.duration,
        videoDetails.currentTime - SECONDS_DELTA
      );

    backwardAnimationControl.set({
      opacity: 1,
      scale: 0.5,
    });

    backwardAnimationControl.start({
      opacity: 0,
      scale: 1,
      transition: { duration: 0.7 },
    });
  };

  React.useEffect(() => {
    const keydownlistener = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;
      if (!isFocused) return;

      if (videoElementRef.current) {
        switch (e.key.toLowerCase()) {
          case 'arrowleft':
            backwards();
            break;

          case 'arrowright':
            forwards();
            break;

          case 'arrowup':
            videoElementRef.current.volume = clamp(
              videoDetails.volume,
              1,
              videoDetails.volume + VOLUME_DELTA
            );
            break;

          case 'arrowdown':
            videoElementRef.current.volume = clamp(
              0,
              videoDetails.volume,
              videoDetails.volume - VOLUME_DELTA
            );
            break;
          case ' ':
            e.preventDefault();
            if (videoDetails.playState === 'playing') {
              videoElementRef.current.pause();
            } else videoElementRef.current.play();

            break;
          default:
            break;
        }
      }
    };

    const fullScreenChange = () => {
      if (document.fullscreenElement) {
        videoElementRef.current?.scrollIntoView();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElementRef.current?.pause();
      } else {
        videoElementRef.current?.play();
      }
    };

    document.addEventListener('keydown', keydownlistener);
    document.addEventListener('fullscreenchange', fullScreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('keydown', keydownlistener);
      document.removeEventListener('fullscreenchange', fullScreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    videoDetails.duration,
    videoDetails.currentTime,
    videoDetails.volume,
    videoDetails.playState,
    backwardAnimationControl,
    forwardAnimationControl,
  ]);

  const handleSeek = (e: React.MouseEvent) => {
    e.stopPropagation();

    const seekElementRect = e.currentTarget.getBoundingClientRect();
    const width = seekElementRect.width;
    const clickedPosition = e.clientX - seekElementRect.x;

    const seekVideoTime = (clickedPosition / width) * videoDetails.duration;

    if (videoElementRef.current) {
      videoElementRef.current.currentTime = seekVideoTime;
    }
  };

  React.useEffect(() => {
    if (
      (videoDetails.playState === 'paused' ||
        videoDetails.playState === 'playing') &&
      previousAnimationLoadingStateRef.current !== 'loading'
    ) {
      playAnimationControl.set({
        opacity: 1,
        scale: 0.5,
      });

      playAnimationControl.start({
        opacity: 0,
        scale: 1,
        transition: { duration: 0.7 },
      });
    }
  }, [videoDetails.playState, playAnimationControl]);

  // load the new video when the src changes
  React.useEffect(() => {
    if (props.src) {
      videoElementRef.current?.load();
    }
  }, [props.src]);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement)
      videoContainerElementRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  return (
    <div
      ref={videoContainerElementRef}
      onDoubleClick={toggleFullscreen}
      className={`${styles.videoContainer} relative overflow-clip group min-h-100 bg-black rounded-md md:fullscreen:w-[100%] md:fullscreen:h-screen md:fullscreen:rounded-none ${props.className} fullscreen:fixed fullscreen:inset-0 z-10`}
    >
      <video
        playsInline={true}
        data-testid="videoplayer__video"
        controls={false}
        onTimeUpdate={() =>
          setVideoDetails({
            ...videoDetails,
            currentTime: videoElementRef.current?.currentTime || 0,
          })
        }
        autoPlay={true}
        onEnded={() => {
          setAutoPlay(true);
          props.onVideoEnded && props.onVideoEnded();
        }}
        onVolumeChange={() =>
          setVideoDetails({
            ...videoDetails,
            volume:
              videoElementRef.current!.volume < 0.005
                ? 0
                : videoElementRef.current?.volume || 0,
          })
        }
        onSeeking={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({ ...videoDetails, playState: 'loading' });
        }}
        onSeeked={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({
            ...videoDetails,
            currentTime: videoElementRef.current?.currentTime || 0,
            playState: videoElementRef.current?.paused ? 'paused' : 'playing',
          });
        }}
        onPause={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({ ...videoDetails, playState: 'paused' });
        }}
        onPlaying={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({ ...videoDetails, playState: 'playing' });
        }}
        onPlay={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({ ...videoDetails, playState: 'playing' });
        }}
        onWaiting={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({ ...videoDetails, playState: 'loading' });
        }}
        onLoadedMetadata={() => {
          previousAnimationLoadingStateRef.current = videoDetails.playState;
          setVideoDetails({
            ...videoDetails,
            loaded: true,
            duration: videoElementRef.current?.duration || 0,
            playState: 'firstloaded',
          });
        }}
        ref={videoElementRef}
        className="group-scope-hover:scale-50 max-h-screen mx-auto h-full absolute object-cover w-full"
        poster={props.posterUrl}
      >
        {Array.isArray(props.src) ? (
          props.src.map((srcType, index) => (
            <source src={srcType.src} key={index} type={srcType.type}></source>
          ))
        ) : (
          <source src={props.src} type="video/mp4"></source>
        )}
        <track
          kind="captions"
          label="English"
          srcLang="en"
          src={props.subtitleUrl}
        ></track>
      </video>

      <div
        className="videocontrols absolute opacity-0 group-hover:opacity-100 transition duration-[350ms] inset-0 bg-gradient-to-b from-[#130f26a1] via-transparent to-[#130F26a1] flex flex-col justify-between"
        onClick={(e) => {
          videoDetails.playState !== 'playing'
            ? videoElementRef.current?.play()
            : videoElementRef.current?.pause();
        }}
      >
        <div className="videodetails py-6 px-8 text-white">
          <p className="text-xl font-medium fullscreen:text-2xl">
            {props.title}
          </p>
          <p className="opacity-80">{props.description}</p>
        </div>

        <div className="opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition delay-200">
          <div
            onClick={handleSeek}
            className={`py-2 -mb-2 ${styles.videoslidecontainer} cursor-pointer`}
          >
            <motion.div className="w-full h-1 bg-[#EAEAEA]">
              <motion.div
                data-testid="videoplayer__seek"
                className="h-full relative bg-app-pink after:rounded-full after:bg-transparent transition after:absolute"
                animate={{
                  width:
                    ((videoDetails.currentTime || 0) / videoDetails.duration) *
                      100 +
                    '%',
                }}
                transition={{ ease: 'linear', duration: 0.3 }}
              ></motion.div>
            </motion.div>
          </div>
          <div
            className="py-4 px-8 text-white flex justify-between items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4">
              <button onClick={backwards} role="button">
                <svg
                  width="25"
                  height="20"
                  viewBox="0 0 25 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.08931 14.2221C6.06612 16.3193 7.73989 18.013 9.82544 19.0145C11.911 20.016 14.2793 20.2634 16.5268 19.7145C18.7743 19.1656 20.7619 17.8544 22.1511 16.0043C23.5402 14.1542 24.2448 11.8797 24.145 9.56831C24.0451 7.25692 23.1469 5.05166 21.6033 3.32828C20.0598 1.60491 17.9665 0.470049 15.68 0.117072C13.3935 -0.235905 11.0554 0.21484 9.06401 1.39251C7.07262 2.57017 5.55118 4.40189 4.75891 6.57556L6.51206 7.21455C7.15649 5.44648 8.39404 3.95655 10.0138 2.99863C11.6336 2.04072 13.5355 1.67408 15.3953 1.96119C17.2551 2.24831 18.9579 3.1714 20.2134 4.5732C21.4689 5.975 22.1995 7.76877 22.2807 9.64886C22.362 11.529 21.7888 13.3791 20.6589 14.8839C19.529 16.3888 17.9122 17.4553 16.0841 17.9018C14.256 18.3483 12.3296 18.147 10.6332 17.3324C8.93679 16.5178 7.57534 15.1402 6.78081 13.4343L5.08931 14.2221Z"
                    fill="white"
                  />
                  <path
                    d="M3.2628 4.3142L3.90861 11.2122L9.55958 7.20393L3.2628 4.3142Z"
                    fill="white"
                  />
                  <path
                    d="M10.64 7.504L11.88 7.136V12H12.56V6.32L10.64 6.8V7.504ZM14.6016 9.2C14.6016 8.87467 14.6336 8.576 14.6976 8.304C14.7616 8.02667 14.8549 7.78933 14.9776 7.592C15.1002 7.38933 15.2469 7.23467 15.4176 7.128C15.5936 7.016 15.7882 6.96 16.0016 6.96C16.2202 6.96 16.4149 7.016 16.5856 7.128C16.7562 7.23467 16.9029 7.38933 17.0256 7.592C17.1482 7.78933 17.2416 8.02667 17.3056 8.304C17.3696 8.576 17.4016 8.87467 17.4016 9.2C17.4016 9.52533 17.3696 9.82667 17.3056 10.104C17.2416 10.376 17.1482 10.6133 17.0256 10.816C16.9029 11.0133 16.7562 11.168 16.5856 11.28C16.4149 11.3867 16.2202 11.44 16.0016 11.44C15.7882 11.44 15.5936 11.3867 15.4176 11.28C15.2469 11.168 15.1002 11.0133 14.9776 10.816C14.8549 10.6133 14.7616 10.376 14.6976 10.104C14.6336 9.82667 14.6016 9.52533 14.6016 9.2ZM13.9216 9.2C13.9216 9.76 14.0096 10.256 14.1856 10.688C14.3616 11.12 14.6042 11.4613 14.9136 11.712C15.2282 11.9573 15.5909 12.08 16.0016 12.08C16.4122 12.08 16.7722 11.9573 17.0816 11.712C17.3962 11.4613 17.6416 11.12 17.8176 10.688C17.9936 10.256 18.0816 9.76 18.0816 9.2C18.0816 8.64 17.9936 8.144 17.8176 7.712C17.6416 7.28 17.3962 6.94133 17.0816 6.696C16.7722 6.44533 16.4122 6.32 16.0016 6.32C15.5909 6.32 15.2282 6.44533 14.9136 6.696C14.6042 6.94133 14.3616 7.28 14.1856 7.712C14.0096 8.144 13.9216 8.64 13.9216 9.2Z"
                    fill="white"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  videoElementRef.current?.paused
                    ? videoElementRef.current.play()
                    : videoElementRef.current?.pause()
                }
                className="h-6 w-6 flex items-center justify-center"
              >
                {videoDetails.playState === 'paused' ||
                videoDetails.playState === 'loading' ||
                videoDetails.playState === 'firstloaded' ? (
                  <svg
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 7.26795C15.3333 8.03775 15.3333 9.96225 14 10.7321L3.5 16.7942C2.16667 17.564 0.5 16.6018 0.5 15.0622V2.93782C0.5 1.39822 2.16667 0.435971 3.5 1.20577L14 7.26795Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    width="24"
                    height="24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M384 810.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667L341.333333 256c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667l0 512C426.666667 793.6 409.6 810.666667 384 810.666667z" />
                    <path d="M640 810.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667L597.333333 256c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667l0 512C682.666667 793.6 665.6 810.666667 640 810.666667z" />
                  </svg>
                )}
              </button>

              <button onClick={forwards} role="button">
                <svg
                  width="25"
                  height="20"
                  viewBox="0 0 25 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2193 14.2221C18.2425 16.3193 16.5687 18.013 14.4832 19.0145C12.3976 20.016 10.0293 20.2634 7.78182 19.7145C5.53432 19.1656 3.54667 17.8544 2.15754 16.0043C0.768408 14.1542 0.0637458 11.8797 0.163619 9.56831C0.263492 7.25692 1.16172 5.05166 2.70526 3.32828C4.2488 1.60491 6.34214 0.470049 8.62861 0.117072C10.9151 -0.235905 13.2532 0.21484 15.2446 1.39251C17.236 2.57017 18.7574 4.40189 19.5497 6.57556L17.7965 7.21455C17.1521 5.44648 15.9146 3.95655 14.2948 2.99863C12.675 2.04072 10.7731 1.67408 8.91329 1.96119C7.05347 2.24831 5.35074 3.1714 4.09522 4.5732C2.8397 5.975 2.10908 7.76877 2.02785 9.64886C1.94661 11.529 2.51978 13.3791 3.64971 14.8839C4.77963 16.3888 6.39639 17.4553 8.22452 17.9018C10.0526 18.3483 11.979 18.147 13.6754 17.3324C15.3718 16.5178 16.7333 15.1402 17.5278 13.4343L19.2193 14.2221Z"
                    fill="white"
                  />
                  <path
                    d="M21.0458 4.3142L20.4 11.2122L14.749 7.20393L21.0458 4.3142Z"
                    fill="white"
                  />
                  <path
                    d="M5.7943 7.504L7.0343 7.136V12H7.7143V6.32L5.7943 6.8V7.504ZM9.75586 9.2C9.75586 8.87467 9.78786 8.576 9.85186 8.304C9.91586 8.02667 10.0092 7.78933 10.1319 7.592C10.2545 7.38933 10.4012 7.23467 10.5719 7.128C10.7479 7.016 10.9425 6.96 11.1559 6.96C11.3745 6.96 11.5692 7.016 11.7399 7.128C11.9105 7.23467 12.0572 7.38933 12.1799 7.592C12.3025 7.78933 12.3959 8.02667 12.4599 8.304C12.5239 8.576 12.5559 8.87467 12.5559 9.2C12.5559 9.52533 12.5239 9.82667 12.4599 10.104C12.3959 10.376 12.3025 10.6133 12.1799 10.816C12.0572 11.0133 11.9105 11.168 11.7399 11.28C11.5692 11.3867 11.3745 11.44 11.1559 11.44C10.9425 11.44 10.7479 11.3867 10.5719 11.28C10.4012 11.168 10.2545 11.0133 10.1319 10.816C10.0092 10.6133 9.91586 10.376 9.85186 10.104C9.78786 9.82667 9.75586 9.52533 9.75586 9.2ZM9.07586 9.2C9.07586 9.76 9.16386 10.256 9.33986 10.688C9.51586 11.12 9.75853 11.4613 10.0679 11.712C10.3825 11.9573 10.7452 12.08 11.1559 12.08C11.5665 12.08 11.9265 11.9573 12.2359 11.712C12.5505 11.4613 12.7959 11.12 12.9719 10.688C13.1479 10.256 13.2359 9.76 13.2359 9.2C13.2359 8.64 13.1479 8.144 12.9719 7.712C12.7959 7.28 12.5505 6.94133 12.2359 6.696C11.9265 6.44533 11.5665 6.32 11.1559 6.32C10.7452 6.32 10.3825 6.44533 10.0679 6.696C9.75853 6.94133 9.51586 7.28 9.33986 7.712C9.16386 8.144 9.07586 8.64 9.07586 9.2Z"
                    fill="white"
                  />
                </svg>
              </button>

              <motion.button whileHover={{ scale: 1.1 }}>
                {parseFloat(videoDetails.volume.toPrecision(1)) > 0.6 ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.1311 5.37547C11.0891 4.97018 11.0454 4.54969 10.938 4.13009C10.6452 3.12627 9.83431 2.50001 8.96485 2.50001C8.47987 2.49822 7.86644 2.79704 7.51866 3.09943L4.63589 5.51414H3.12678C2.01614 5.51414 1.12309 6.37034 0.954439 7.60587C0.811131 8.7922 0.776177 11.0316 0.954439 12.3369C1.10911 13.6422 1.96197 14.4859 3.12678 14.4859H4.63589L7.57458 16.9364C7.87606 17.1985 8.40822 17.4991 8.89756 17.4991C8.92902 17.5 8.95699 17.5 8.98495 17.5C9.87101 17.5 10.6513 16.8505 10.9441 15.8493C11.0544 15.4261 11.093 15.0294 11.1304 14.646L11.1304 14.646L11.1311 14.6388L11.1704 14.2568C11.3207 13.0177 11.3207 6.97424 11.1704 5.74407L11.1311 5.37547ZM14.5056 5.41215C14.2653 5.05786 13.7891 4.96929 13.4404 5.21532C13.0953 5.46314 13.0096 5.95163 13.2499 6.30502C13.9184 7.29005 14.2863 8.60163 14.2863 10C14.2863 11.3975 13.9184 12.7099 13.2499 13.695C13.0096 14.0484 13.0953 14.5369 13.4413 14.7847C13.5706 14.8759 13.7218 14.9242 13.8774 14.9242C14.1281 14.9242 14.3623 14.7981 14.5056 14.5878C15.3498 13.3443 15.8155 11.7151 15.8155 10C15.8155 8.28492 15.3498 6.65573 14.5056 5.41215ZM16.0752 2.68422C16.423 2.43729 16.901 2.52765 17.1395 2.88105C18.4468 4.80547 19.1668 7.3347 19.1668 9.99991C19.1668 12.6669 18.4468 15.1952 17.1395 17.1197C16.9971 17.3299 16.762 17.4561 16.5113 17.4561C16.3557 17.4561 16.2054 17.4078 16.0761 17.3165C15.7301 17.0687 15.6444 16.5811 15.8838 16.2268C17.0146 14.5609 17.6376 12.3493 17.6376 9.99991C17.6376 7.65141 17.0146 5.43979 15.8838 3.77392C15.6444 3.42053 15.7301 2.93204 16.0752 2.68422Z"
                      fill="white"
                    />
                  </svg>
                ) : parseFloat(videoDetails.volume.toPrecision(1)) > 0.01 ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.1396 4.95611C15.2687 5.45963 15.3212 5.96422 15.3716 6.45056L15.4188 6.89288C15.5994 8.36908 15.5994 15.6213 15.4188 17.1082L15.3716 17.5666L15.3707 17.5752C15.3259 18.0352 15.2794 18.5113 15.1469 19.0192C14.7952 20.2206 13.8577 21 12.7932 21C12.7596 21 12.726 21 12.6882 20.9989C12.1003 20.9989 11.461 20.6382 11.0988 20.3236L7.56822 17.383H5.75517C4.35575 17.383 3.33112 16.3706 3.1453 14.8042C2.93114 13.2379 2.97313 10.5506 3.1453 9.12705C3.34792 7.6444 4.42084 6.61697 5.75517 6.61697H7.56822L11.0316 3.71932C11.4494 3.35644 12.1864 2.99786 12.7691 3.00001C13.8136 3.00001 14.7879 3.75153 15.1396 4.95611ZM18.1476 6.25839C18.5665 5.96529 19.1397 6.07051 19.4263 6.49458C20.4404 7.98796 21 9.94298 21 12C21 14.057 20.4404 16.012 19.4263 17.5054C19.2541 17.7577 18.9728 17.9091 18.6715 17.9091C18.4836 17.9091 18.3019 17.8511 18.1476 17.7416C17.7319 17.4453 17.629 16.8591 17.9177 16.434C18.7208 15.2509 19.1628 13.6759 19.1628 12C19.1628 10.323 18.7208 8.74914 17.9177 7.56603C17.629 7.14089 17.7319 6.5547 18.1476 6.25839Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.4201 3.27085C20.7801 2.91095 21.3538 2.90884 21.7275 3.26979C22.0906 3.63285 22.0906 4.21926 21.7286 4.58127L4.57987 21.729C4.40943 21.8994 4.16383 22 3.92458 22C3.69062 22 3.45984 21.9047 3.27352 21.7322C2.90936 21.3543 2.90936 20.7795 3.27035 20.4186L6.09689 17.5924H6.0683C4.65927 17.5924 3.63346 16.5974 3.4429 15.052C3.23012 13.5066 3.27247 10.8603 3.4429 9.4525C3.64299 7.99177 4.72385 6.98725 6.0683 6.98725H7.89867L11.3921 4.12929C11.8167 3.7694 12.5683 3.42962 13.1495 3.42009C14.2081 3.42009 15.182 4.15999 15.5314 5.34551C15.669 5.84407 15.723 6.3405 15.7653 6.81789L15.849 7.49427C15.8627 7.59801 15.8754 7.69751 15.886 7.80336L20.4201 3.27085ZM14.8809 13.7314C15.0238 13.5917 15.3435 13.4911 15.4874 13.5282C15.876 13.6266 15.9522 14.1844 15.9458 14.6227C15.9278 15.895 15.8855 16.7799 15.8177 17.3271L15.7701 17.7781L15.7693 17.7864C15.724 18.24 15.6772 18.7094 15.5425 19.2102C15.19 20.3936 14.2446 21.1621 13.1701 21.1621C13.1352 21.1621 13.1002 21.1621 13.0642 21.161C12.4704 21.161 11.8267 20.8054 11.4615 20.4952L10.1604 19.4886C9.66605 19.1213 9.81214 18.5349 10.0895 18.1951C10.2966 17.9422 12.786 15.6569 14.0935 14.4566C14.5369 14.0496 14.8444 13.7673 14.8809 13.7314Z"
                      fill="white"
                    />
                  </svg>
                )}
              </motion.button>

              <p>{parseFloat(videoDetails.volume.toPrecision(1))}</p>
              <p>
                {formatTime(
                  videoDetails.currentTime * 1000,
                  'MM:SS',
                  'relative'
                )}{' '}
                /{' '}
                {formatTime(videoDetails.duration * 1000, 'MM:SS', 'relative')}
              </p>
            </div>

            <div className="flex gap-4">
              {/* <button>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.7025 12.4485C19.0304 12.6227 19.2833 12.8977 19.4613 13.1727C19.8079 13.741 19.7798 14.4377 19.4425 15.0518L18.7868 16.1518C18.4402 16.7385 17.7938 17.1052 17.1287 17.1052C16.8008 17.1052 16.4354 17.0135 16.1357 16.8302C15.8921 16.6743 15.6111 16.6193 15.3113 16.6193C14.3839 16.6193 13.6063 17.3802 13.5782 18.2877C13.5782 19.3418 12.7164 20.1668 11.639 20.1668H10.365C9.27833 20.1668 8.41647 19.3418 8.41647 18.2877C8.39774 17.3802 7.6202 16.6193 6.69277 16.6193C6.38363 16.6193 6.10259 16.6743 5.86839 16.8302C5.56862 17.0135 5.1939 17.1052 4.87539 17.1052C4.2009 17.1052 3.55451 16.7385 3.2079 16.1518L2.56151 15.0518C2.2149 14.456 2.19616 13.741 2.54277 13.1727C2.69266 12.8977 2.9737 12.6227 3.29221 12.4485C3.55451 12.3202 3.72314 12.1093 3.88239 11.8618C4.35079 11.0735 4.06975 10.0377 3.27347 9.57016C2.34605 9.04766 2.04627 7.8835 2.58025 6.976L3.2079 5.89433C3.75124 4.98683 4.91286 4.666 5.84966 5.19766C6.66467 5.63766 7.72325 5.34433 8.20101 4.56516C8.3509 4.3085 8.43521 4.0335 8.41647 3.7585C8.39774 3.401 8.50079 3.06183 8.67878 2.78683C9.02539 2.2185 9.65304 1.85183 10.3369 1.8335H11.6578C12.351 1.8335 12.9787 2.2185 13.3253 2.78683C13.4939 3.06183 13.6063 3.401 13.5782 3.7585C13.5595 4.0335 13.6438 4.3085 13.7937 4.56516C14.2714 5.34433 15.33 5.63766 16.1544 5.19766C17.0818 4.666 18.2528 4.98683 18.7868 5.89433L19.4144 6.976C19.9578 7.8835 19.658 9.04766 18.7212 9.57016C17.9249 10.0377 17.6439 11.0735 18.1217 11.8618C18.2715 12.1093 18.4402 12.3202 18.7025 12.4485ZM8.3509 11.0093C8.3509 12.4485 9.54063 13.5943 11.0114 13.5943C12.4822 13.5943 13.6438 12.4485 13.6438 11.0093C13.6438 9.57016 12.4822 8.41516 11.0114 8.41516C9.54063 8.41516 8.3509 9.57016 8.3509 11.0093Z"
                    fill="white"
                  />
                </svg>
              </button> */}

              <button onClick={toggleFullscreen}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 2.75H19.25V8.25"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 19.25H2.75V13.75"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.2497 2.75L12.833 9.16667"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.75 19.2502L9.16667 12.8335"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="interactions h-full w-full absolute inset-0 flex items-center justify-around pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={backwardAnimationControl}
          className="w-24 h-24 rounded-full flex items-center justify-center bg-app-pink backwards"
        >
          <h1 className="text-2xl text-white font-medium text-center">
            - {SECONDS_DELTA} secs
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={playAnimationControl}
          className="w-32 h-32 rounded-full flex items-center justify-center bg-app-pink backwards"
        >
          {videoDetails.playState === 'playing' ? (
            <svg
              width="54"
              height="54"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 7.26795C15.3333 8.03775 15.3333 9.96225 14 10.7321L3.5 16.7942C2.16667 17.564 0.5 16.6018 0.5 15.0622V2.93782C0.5 1.39822 2.16667 0.435971 3.5 1.20577L14 7.26795Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              width="54"
              height="54"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M384 810.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667L341.333333 256c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667l0 512C426.666667 793.6 409.6 810.666667 384 810.666667z" />
              <path d="M640 810.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667L597.333333 256c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667l0 512C682.666667 793.6 665.6 810.666667 640 810.666667z" />
            </svg>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={forwardAnimationControl}
          className="w-24 h-24 rounded-full flex items-center justify-center bg-app-pink forwards"
        >
          <h1 className="text-2xl text-white font-medium text-center">
            +{SECONDS_DELTA} secs
          </h1>
        </motion.div>
      </div>

      {videoDetails.playState === 'loading' || props.shouldShowLoader ? (
        <div className={`w-10 h-10 border-4 border-app-pink loader`}></div>
      ) : null}
    </div>
  );
};

export default React.memo(VideoPlayer);
