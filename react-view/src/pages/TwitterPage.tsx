import { Box, Button, Container, Flex, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPlug } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const TwitterPage: React.FunctionComponent<any> = (props) => {
    const toast = useToast();
    let auth = useAuth();
    let [isConnecting, setIsConnecting] = useState(false);

  function handleConnectToTwitter(e: React.MouseEvent) {
    console.log("handleConnectToTwitter");
    setIsConnecting(true);

    fetch("https://api.yogveda.live/app/twitter/oauth/access", {
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
      })
      .catch((err) => {

        console.log(err)
        toast({
            status: "error",
            title: "Could not connect twitter account"
        })
      })
      .finally(() => {
        setIsConnecting(false);
      });
  }

  return (
    <Box h="100vh">
      <Flex align="center" justify={"center"} h="100%">
        <Button
          isLoading={isConnecting}
          colorScheme={"twitter"}
          onClick={handleConnectToTwitter}
        >
          <FaPlug />
          Connect Twitter
        </Button>
      </Flex>
    </Box>
  );
};

export default TwitterPage;
