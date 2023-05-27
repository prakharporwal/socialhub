import { Button, Center, Text } from "@chakra-ui/react"
import { useState } from "react";
import { SiLinkedin } from "react-icons/si"
import { useAuth } from "../../hooks/useAuth";

const ConnectLinkedinAccountButton: React.FunctionComponent<any>= (props)=>{
    const [isConnectingLinkedin, setIsConnectingLinkedin] = useState<boolean>(false);
    const auth = useAuth()

    async function handleConnectLinkedinAccount() {
        setIsConnectingLinkedin(true);
    
        await fetch(
          "https://api.yogveda.live" + `/app/linkedin/oauth/access/initiate`,
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
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        colorScheme={"linkedin"}
        w={"full"}
        maxW={"md"}
        leftIcon={<SiLinkedin />}
        isLoading={isConnectingLinkedin}
        onClick={handleConnectLinkedinAccount}
      >
        <Center>
          <Text>Connect Linkedin Account</Text>
        </Center>
      </Button>
    )
}

export default ConnectLinkedinAccountButton;