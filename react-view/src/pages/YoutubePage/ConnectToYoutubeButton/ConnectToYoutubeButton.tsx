import { Button, useToast } from "@chakra-ui/react";
import { SiYoutube } from "react-icons/si";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import CONSTANTS from "../../../EnvConstant";

export function ConnectToYoutubeButton(props: any) {
  const toast = useToast();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const auth = useAuth();

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
    <Button
      leftIcon={<SiYoutube />}
      isLoading={isConnecting}
      colorScheme={"red"}
      loadingText={"Connecting to Youtube"}
      onClick={handlerConnectToYoutube}
    >
      Connect to Youtube
    </Button>
  );
}
