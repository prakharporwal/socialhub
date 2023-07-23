import { Button, Center, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SiAppstore, SiGrafana, SiLinkedin, SiLinode } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import CONSTANTS from "../../CONSTANTS";

const ConnectLinkedinAccountButton: React.FunctionComponent<any> = (props) => {
  const [isConnectingLinkedin, setIsConnectingLinkedin] =
    useState<boolean>(false);
  const auth = useAuth();
  const toast = useToast();

  const [isAccountConnected, setIsAccountConnected] = useState(true);

  async function handleConnectLinkedinAccount() {
    setIsConnectingLinkedin(true);

    await fetch(
      CONSTANTS.api_server_url + "/app/linkedin/oauth/access/initiate",
      {
        method: "get",
        headers: {
          "access-token": auth.accessToken || "",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("");
      })
      .then((data) => {
        console.log("data", data);
        window.location.replace(data.redirect_uri);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsConnectingLinkedin(false);
      });
  }

  return (
    <Button
      bg={isAccountConnected ? "teal.500" : "blue.400"}
      color={"white"}
      _hover={{
        bg: isAccountConnected ? "teal.500" : "blue.500",
      }}
      colorScheme={"linkedin"}
      w={"full"}
      maxW={"md"}
      leftIcon={isAccountConnected ? <SiGrafana /> : <SiLinkedin />}
      isLoading={isConnectingLinkedin}
      onClick={handleConnectLinkedinAccount}
    >
      <Center>
        <Text>Connect Linkedin Account</Text>
      </Center>
    </Button>
  );
};

export default ConnectLinkedinAccountButton;
