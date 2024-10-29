import { useEffect, useRef, useState, VideoHTMLAttributes } from "react";
import "./styles.css";
import { Box } from "@chakra-ui/react";

export interface ShortVideoItemProps
  extends VideoHTMLAttributes<typeof ShortVideoItem> {
  nextId: string;
  channelId?: string;
  description?: string;
}

export const ShortVideoItem = (props: ShortVideoItemProps) => {
  const { src } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          if (videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.error("Playback error:", error);
            });
            setIsPlaying(true);
            videoRef.current.scrollIntoView();
          }
        } else {
          if (videoRef.current) {
            setIsPlaying(false);
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.4 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "black",
        overflowX: "hidden",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <Box
        id={props.id}
        width={{ base: "100%", md: "400px" }}
        height={{ base: "100%", md: "600px" }}
        borderRadius={"12px"}
        onClick={() => {
          if (isPlaying) {
            videoRef.current?.pause();
          } else {
            videoRef.current?.play().catch((error) => {
              console.error("Playback error:", error);
            });
          }
          setIsPlaying(!isPlaying);
        }}
      >
        <video
          ref={videoRef}
          src={src}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
          onEnded={() => {
            console.log("Video ended");
            const nextVideo = document.getElementById(props.nextId);
            nextVideo?.scrollIntoView();
          }}
        ></video>
      </Box>
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {props.channelId}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          color: "white",
          fontSize: "16px",
        }}
      >
        {props.description}
      </div>
    </div>
  );
};
