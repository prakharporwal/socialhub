import { Image } from "@chakra-ui/react";

interface IPreviewBoxProps {
  file: File;
}
export default function MediaPreviewBox({
  file,
}: IPreviewBoxProps): JSX.Element {
  const fileType = file.type.startsWith("video/") ? "video" : "image";
  console.log(file);
if(fileType === "video") {
  return <Video src={URL.createObjectURL(file)} />;
}

  return (
    <Image
      src={URL.createObjectURL(file)}
      alt="preview"
      objectFit="contain"
      borderRadius="lg"
      aspectRatio={"9/16"}
      bg={"gray.200"}
      width={"240px"}
      align={"center"}
    />
  );
}

function Video(
  props: React.VideoHTMLAttributes<HTMLVideoElement>
): JSX.Element {
  return (
    <video
      autoPlay
      muted
      controls
      style={{
        width: "240px",
        aspectRatio: "9/16",
        objectFit: "contain",
        borderRadius: "8px",
      }}
      {...props}
    />
  );
}
