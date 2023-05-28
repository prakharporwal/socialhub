import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlug } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import CONSTANTS from "../CONSTANTS";

const TwitterPage: React.FunctionComponent<any> = (props) => {
  const toast = useToast();
  const auth = useAuth();
  let [isConnecting, setIsConnecting] = useState(false);

  function handleConnectToTwitter(e: React.MouseEvent) {
    setIsConnecting(true);

    fetch(CONSTANTS.api_server_url + "/app/twitter/oauth2/access/initiate", {
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
        setIsConnecting(false);
      });
  }

  function handleFetchTweets() {
    fetch(CONSTANTS.api_server_url + "/app/twitter/tweets/all", {
      headers: {
        "access-token": auth.accessToken || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("failed fetching tweets");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
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
          isLoading={isConnecting}
          colorScheme={"twitter"}
          onClick={handleConnectToTwitter}
        >
          <FaPlug />
          Connect Twitter
        </Button>

        <Button colorScheme={"twitter"} onClick={handleConnectToTwitter}>
          <FaPlug />
          Get Tweets Twitter
        </Button>
      </Flex>
    </Box>
  );
};

export default withAuthenticationRequired(TwitterPage);
