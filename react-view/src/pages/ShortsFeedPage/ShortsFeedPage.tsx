import React, { useEffect, useState } from "react";
import ShortVideoList from "./ShortsVideoList";
import { ShortVideoListProps } from "./ShortsVideoList/ShortsVideoList";

const list: ShortVideoListProps = {
  list: [
    {
      id: "video-2",
      src: "/videos/video-2.mp4",
      nextId: "video-3",
      channelId: "RajeshArora",
      description: "Ariana",
    },
    {
      id: "video-3",
      nextId: "video-4",
      src: "/videos/video-3.mp4",
      description: "TMKOC",
    },
    {
      id: "video-4",
      nextId: "video-5",
      src: "/videos/video-4.mp4",
      description: "Hrithik roshan",
    },
    {
      id: "video-5",
      nextId: "video-6",
      src: "/videos/video-5.mp4",
      description: "Hrithik roshan is dancing very good",
    },
    {
      id: "video-6",
      nextId: "video-7",
      src: "/videos/video-6.mp4",
      description: "Frontend masters mein people teaching so much",
    },
    {
      id: "video-7",
      nextId: "video-8",
      src: "/videos/video-7.mp4",
    },
    {
      id: "video-8",
      nextId: "video-9",
      src: "/videos/video-8.mp4",
    },
    {
      id: "video-9",
      nextId: "video-1",
      src: "/videos/video-9.mp4",
    },
  ],
};

export const ShortsFeedPage: React.FunctionComponent = (props: any) => {
  const [videoList, setVideoList] = useState(list.list);

  useEffect(() => {
    fetch("http://localhost:1337/api/articles")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        console.log("body", data.data);
        setVideoList(data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <ShortVideoList list={videoList} />
    </div>
  );
};
