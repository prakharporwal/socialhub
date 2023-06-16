import { Box, Button, Flex } from "@chakra-ui/react";
import { FaInstagram, FaPlug } from "react-icons/fa";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";

const InstagramPage = () => {
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
        //   isLoading={isConnecting}
        //   colorScheme={"twitter"}
        //   onClick={handleConnectToTwitter}
        >
          <FaInstagram />
          Connect Instagram
        </Button>

        <Button
          colorScheme={"messenger"}
          // onClick={handleFetchTweets}
        >
          <FaInstagram />
          Get Instagram Feed
        </Button>
      </Flex>
      {/* <Container>
        {tweets.map((tweet) => {
          return <TweetCard tweet={tweet}></TweetCard>;
        })}
      </Container> */}
    </Box>
  );
};

export default withAuthenticationRequired(InstagramPage);
