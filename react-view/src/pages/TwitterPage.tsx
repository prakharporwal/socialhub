import { Box, Button, Container, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPlug } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
const TwitterPage: React.FunctionComponent<any> = (props) => {
  let auth = useAuth();

  function handleConnectToTwitter(e: React.MouseEvent) {
    console.log("handleConnectToTwitter");

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
      })
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <Box h="100vh">
      <Flex align="center" justify={"center"} h="100%">
        <Button colorScheme={"twitter"} onClick={handleConnectToTwitter}>
          <FaPlug />
          Connect Twitter
        </Button>
      </Flex>
    </Box>
  );
};

export default TwitterPage;
