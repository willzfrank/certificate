import React, { useRef, useEffect, useState } from 'react'
import styles from './videoplayer.module.css'
import { motion } from 'framer-motion'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import dynamic from 'next/dynamic'
// Import ReactPlayer using dynamic import
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  src: string | SourceInfo[]
  title?: string
  description?: string
  posterUrl?: string
  subtitleUrl?: string
  className?: string
  shouldShowLoader?: boolean
  startFrom?: string
  endAt?: string
  onVideoEnded?: () => void
}

interface SourceInfo {
  src: string
  type: string
}

function VideoCoursePlayer(props: VideoPlayerProps): JSX.Element {
  const [videoSrc, setVideoSrc] = useState<SourceInfo[]>([])

  const videoRef = useRef<any>(null)

  const SMALL_DEVICE_WIDTH_THRESHOLD = 500

  // Determine if the device is small based on the threshold
  const isSmallDevice = window.innerWidth <= SMALL_DEVICE_WIDTH_THRESHOLD

  useEffect(() => {
    if (props.src) {
      setVideoSrc((_prev: any) => {
        return Array.isArray(props.src)
          ? props.src
          : [{ src: props.src, type: 'video/mp4' }]
      })
    }
  }, [props.src])

  const handleContextMenu = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Prevent the default right-click menu
  }

  const handleProgress = (state: any) => {
    if (props.startFrom && state.playedSeconds < +props.startFrom) {
      // Seek the video back to the start time
      videoRef.current.seekTo(+props.startFrom, 'seconds')
    }
    // Check if the current time has reached the desired end time (240 seconds)
    if (props.endAt) {
      if (state.playedSeconds >= +props.endAt) {
        // Stop the video when it reaches the end time
        videoRef.current.getInternalPlayer().stopVideo()
        props?.onVideoEnded ? props.onVideoEnded() : undefined
      }
    }
  }

  return (
    <div className="w-full ">
      <motion.div>
        <h6 className="capitalize inter">{props.title}</h6>
        <div>
          <div>
            <ReactPlayer
              controls
              onContextMenu={handleContextMenu}
              controlsList="nodownload"
              playsInline
              poster={props.posterUrl}
              onEnded={props.onVideoEnded}
              ref={videoRef}
              onReady={() =>
                !props.endAt || props.endAt === '0'
                  ? ''
                  : videoRef.current.seekTo(
                      props.startFrom ? +props.startFrom : 0,
                      'seconds'
                    )
              }
              width="100%"
              height={isSmallDevice ? 'auto' : '100vh'}
              onProgress={(e) =>
                !props.endAt || props.endAt === '0' ? '' : handleProgress(e)
              }
              playing={true}
              onError={(e) => {
                console.log(e)
              }}
              className="rounded md:border-4 border-app-pink "
              url={videoSrc[0]?.src}
            ></ReactPlayer>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default VideoCoursePlayer
