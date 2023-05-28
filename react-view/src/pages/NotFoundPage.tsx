import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const NotFoundPage: React.FunctionComponent<any> = () => {
  return (
    <Box h={"100vh"} bg="yellow.100" display={"grid"} placeItems={"center"}>
      <Heading>Page Not Found</Heading>
    </Box>
  );
};

export default NotFoundPage;
