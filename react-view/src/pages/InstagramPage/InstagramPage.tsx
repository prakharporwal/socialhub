import { useState } from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import withAuthenticationRequired from "../../hoc/withAuthenticationRequired";
import { SiInstagram } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import CONSTANTS from "../../EnvConstant";

const InstagramPageContainer = () => {
  const toast = useToast();
  const auth = useAuth();

  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  function handlerConnectToInstagram() {
    setIsConnecting(true);

    fetch(
      CONSTANTS.api_server_url + "/api/p/instagram/oauth2/access/initiate",
      {
        headers: {
          "access-token": auth.accessToken || "",
        },
      }
    )
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
          title: "Could not connect to Twitter",
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
          leftIcon={<SiInstagram />}
          isLoading={isConnecting}
          colorScheme={"facebook"}
          onClick={handlerConnectToInstagram}
        >
          Connect Instagram
        </Button>
      </Flex>
    </Box>
  );
};

export const InstaPage = withAuthenticationRequired(InstagramPageContainer);
