import { Box, Button, Flex } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";

const FacebookPage = () => {
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
          <FaFacebook />
          Connect Facebook
        </Button>

        <Button
          colorScheme={"facebook"}
          // onClick={handleFetchTweets}
        >
          <FaFacebook />
          Get Facebook Feed
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

export default withAuthenticationRequired(FacebookPage);
