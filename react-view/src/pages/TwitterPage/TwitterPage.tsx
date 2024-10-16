import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CONSTANTS from "../../EnvConstant";
import { SiTwitter } from "react-icons/si";

type TweetType = {
  id: string;
  text: string;
};

const TwitterPage: React.FunctionComponent<any> = (props) => {
  const toast = useToast();
  const auth = useAuth();
  let [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState("");
  const [tweets, setTweets] = useState<TweetType[]>([
    {
      id: "hello",
      text: "Hi All",
    },
  ]);

  function handleConnectToTwitter(e: React.MouseEvent) {
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

  function handleFetchTweets() {
    fetch(CONSTANTS.api_server_url + "/api/p/twitter/tweets/all", {
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
    <Box h="20vh">
      <Flex
        direction={"column"}
        align="center"
        justify={"center"}
        h="100%"
        gap={"8"}
      >
        <Button
          isLoading={isSubmitting}
          colorScheme={isConnected ? "green" : "twitter"}
          leftIcon={<SiTwitter />}
          loadingText="Connecting"
          onClick={handleConnectToTwitter}
        >
          {isConnected ? `${twitterUsername}` : "Connect Twitter"}
        </Button>
        {/* <Button colorScheme={"twitter"} onClick={handleFetchTweets}>
          Get Tweets Twitter
        </Button> */}
      </Flex>
      {/* TODO once we can read all the users tweets we enable this component */}
      {/* <Container>
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} tweet={tweet}></TweetCard>;
        })}
      </Container> */}
    </Box>
  );
};

const TweetCard: React.FunctionComponent<any> = ({ tweet }) => {
  return (
    <Card p="4">
      <CardHeader>Tweet by You</CardHeader>
      <CardBody>{tweet.text}</CardBody>
    </Card>
  );
};

export { TwitterPage };
