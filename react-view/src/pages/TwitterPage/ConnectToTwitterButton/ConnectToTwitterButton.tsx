import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import CONSTANTS from "../../../EnvConstant";
import { SiTwitter } from "react-icons/si";

export function ConnectToTwitterButton(props: any) {
  const toast = useToast();
  const auth = useAuth();
  let [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState("");

  function handleConnectToTwitter(e: React.MouseEvent) {
    if (isConnected) return;
    setIsSubmitting(true);

    fetch(CONSTANTS.api_server_url + "/api/p/twitter/oauth2/access/initiate", {
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
        console.log(data);
        // toast({
        //     status: "error",
        //     title: "Could not connect twitter account"
        // })

        window.location = data.redirect_url;
      })
      .catch((err) => {
        console.log(err);
        toast({
          id: "post-submit-error",
          status: "error",
          title: "Could not connect to Twitter",
          description: "",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    fetch(CONSTANTS.api_server_url + "/api/p/twitter/account/info", {
      method: "get",
      headers: {
        "access-token": auth.accessToken || "",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((body) => {
        if (
          body.account?.username !== undefined &&
          body.account?.username !== ""
        ) {
          setIsConnected(true);
          setTwitterUsername(body.account?.username);
          console.log(body.account?.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Button
      isLoading={isSubmitting}
      variant={isConnected ? "outline" : "solid"}
      colorScheme={"twitter"}
      leftIcon={<SiTwitter />}
      loadingText="Connecting"
      onClick={handleConnectToTwitter}
    >
      {isConnected ? `${twitterUsername}` : "Connect Twitter"}
    </Button>
  );
}
