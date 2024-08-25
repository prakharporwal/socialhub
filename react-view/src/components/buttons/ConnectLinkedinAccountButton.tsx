import { Button, Center, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SiGrafana, SiLinkedin } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import CONSTANTS from "../../CONSTANTS";

const ConnectLinkedinAccountButton: React.FunctionComponent<any> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [urn, setUrn] = useState("");

  const auth = useAuth();

  const [isAccountConnected, setIsAccountConnected] = useState(false);

  useEffect(() => {
    fetch(CONSTANTS.api_server_url + "/api/p/linkedin/account/info", {
      headers: {
        "access-token": auth.accessToken || "",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error("Failed to get linkedin account info!");
      })
      .then((body) => {
        if (body.account?.urn !== undefined && body.account?.urn !== "") {
          setUrn(body.account?.urn);
          setIsAccountConnected(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleConnectLinkedinAccount() {
    setIsSubmitting(true);
    await fetch(
      CONSTANTS.api_server_url + "/api/p/linkedin/oauth/access/initiate",
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
        setIsSubmitting(false);
      });
  }

  return (
    <Button
      bg={isAccountConnected ? "green.500" : "blue.400"}
      color={"white"}
      _hover={{
        bg: isAccountConnected ? "green.500" : "blue.500",
      }}
      colorScheme={"linkedin"}
      w={"full"}
      maxW={"md"}
      leftIcon={<SiLinkedin />}
      isLoading={isSubmitting}
      loadingText="Connecting"
      onClick={handleConnectLinkedinAccount}
    >
      <Center>
        <Text>
          {isAccountConnected
            ? "Connected to " + urn
            : "Connect Linkedin Account"}
        </Text>
      </Center>
    </Button>
  );
};

const ConnectedAccountButton: React.FunctionComponent<any> = (props) => {
  return <Button></Button>;
};

export default ConnectLinkedinAccountButton;
