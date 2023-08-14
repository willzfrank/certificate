import React, { useRef, useEffect, useState } from 'react';
import styles from './videoplayer.module.css';
import { motion } from 'framer-motion';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

interface VideoPlayerProps {
  src: string | SourceInfo[];
  title?: string;
  description?: string;
  posterUrl?: string;
  subtitleUrl?: string;
  className?: string;
  shouldShowLoader?: boolean;
  onVideoEnded?: () => void;
}

interface SourceInfo {
  src: string;
  type: string;
}

function VideoCoursePlayer(props: VideoPlayerProps): JSX.Element {
  const [videoSrc, setVideoSrc] = useState<SourceInfo[]>([]);

  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (props.src) {
      setVideoSrc((_prev: any) => {
        return Array.isArray(props.src)
          ? props.src
          : [{ src: props.src, type: 'video/mp4' }];
      });
    }
  }, [props.src]);

  useEffect(() => {
    videoRef.current.load();
    videoRef.current.play().catch((error: any) => {
      console.error('Autoplay failed:', error);
    });
  }, [videoSrc]);

   const handleContextMenu = (event: { preventDefault: () => void; }) => {
     event.preventDefault(); // Prevent the default right-click menu
   };

  return (
    <div className="w-full">
      <motion.div>
        <h6 className="capitalize inter">{props.title}</h6>
        <div>
          <div>
            {
              <video
                controls
                onContextMenu={handleContextMenu}
                controlsList="nodownload"
                playsInline
                poster={props.posterUrl}
                onEnded={props.onVideoEnded}
                ref={videoRef}
                width="100%"
                className="rounded  md:border-4 border-app-pink "
              >
                {videoSrc.map((source, index) => (
                  <source
                    key={index}
                    src={source.src}
                    type={source.type ? source.type : 'video/mp4'}
                  />
                ))}
              </video>
            }
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VideoCoursePlayer;
