import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import ConnectLinkedinAccountButton from "../components/buttons/ConnectLinkedinAccountButton";

const LinkedinPage: React.FunctionComponent<any> = (props) => {
  return (
    <Box h="80vh">
      <Flex
        direction={"column"}
        align="center"
        justify={"center"}
        h="100%"
        gap={"8"}
      >
        <ConnectLinkedinAccountButton />
      </Flex>
    </Box>
  );
};

export default withAuthenticationRequired(LinkedinPage);
