import { Box, Flex } from "@chakra-ui/react";
import withAuthenticationRequired from "../../hoc/withAuthenticationRequired";
import VideoUploadForm from "./VideoUploadForm/VideoUploadForm";
import FileUpload from "./FileUpload/FileUpload";
import { ConnectToYoutubeButton } from "./ConnectToYoutubeButton/ConnectToYoutubeButton";

export function YoutubePageContainer() {
  return (
    <Box h="80vh">
      <Flex
        direction={"column"}
        align="center"
        justify={"center"}
        h="100%"
        gap={"8"}
      >
        <ConnectToYoutubeButton />
        <VideoUploadForm />
        <FileUpload />
      </Flex>
    </Box>
  );
}

export const YoutubePage = withAuthenticationRequired(YoutubePageContainer);
