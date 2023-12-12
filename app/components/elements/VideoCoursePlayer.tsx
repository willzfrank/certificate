import React, { useRef, useEffect, useState } from "react";
import styles from "./videoplayer.module.css";
import { motion } from "framer-motion";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import dynamic from "next/dynamic";
// Import ReactPlayer using dynamic import
import ReactPlayer from "react-player";

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

	console.log(videoSrc[0]);

	useEffect(() => {
		if (props.src) {
			setVideoSrc((_prev: any) => {
				return Array.isArray(props.src) ? props.src : [{ src: props.src, type: "video/mp4" }];
			});
		}
	}, [props.src]);

	const handleContextMenu = (event: { preventDefault: () => void }) => {
		event.preventDefault(); // Prevent the default right-click menu
	};

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
							width="100%"
							playing={true}
							onError={(e) => {
								console.log(e);
							}}
							className="rounded h-full md:border-4 border-app-pink "
							url={videoSrc[0]?.src}></ReactPlayer>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default VideoCoursePlayer;
