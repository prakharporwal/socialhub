import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { SiYoutube } from "react-icons/si";
import withAuthenticationRequired from "../../hoc/withAuthenticationRequired";
import CONSTANTS from "../../EnvConstant";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import VideoUploadForm from "./VideoUploadForm/VideoUploadForm";
import FileUpload from "./FileUpload/FileUpload";

export function YoutubePageContainer() {
  const toast = useToast();
  const auth = useAuth();

  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  function handlerConnectToYoutube() {
    setIsConnecting(true);

    fetch(CONSTANTS.api_server_url + "/api/p/youtube/oauth2/access/initiate", {
      headers: {
        "access-token": auth.accessToken || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("error initiating connecting to twitter");
      })
      .then((data) => {
        // console.log(data);
        // toast({
        //   status: "error",
        //   title: "Could not connect instagram account",
        // });

        window.location.href = data.redirect_uri;
      })
      .catch((err) => {
        console.log(err);
        toast({
          id: "post-submit-error",
          status: "error",
          title: "Could not connect to youtube",
          description: "",
        });
      })
      .finally(() => {
        setIsConnecting(false);
      });
  }

  return (
    <Box h="80vh">
      <Flex
        direction={"column"}
        align="center"
        justify={"center"}
        h="100%"
        gap={"8"}
      >
        <Button
          leftIcon={<SiYoutube />}
          isLoading={isConnecting}
          colorScheme={"red"}
          loadingText={"Connecting to Youtube"}
          onClick={handlerConnectToYoutube}
        >
          Connect to Youtube
        </Button>
        <VideoUploadForm />
        <FileUpload />
      </Flex>
    </Box>
  );
}

export const YoutubePage = withAuthenticationRequired(YoutubePageContainer);
