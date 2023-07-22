import React, { ReactNode } from "react";
import { Flex, Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";

type IProps = {
  headingText: string;
  children: ReactNode;
};

const FormContainer: React.FunctionComponent<IProps> = (props) => {
  return (
    <Flex
      className="signin-background"
      h={"100vh"}
      align={"center"}
      justify={"center"}
      backgroundColor={"whitesmoke"}
    >
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{props.headingText}</Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
          </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {/* // Todo: Form Validate and sanitize input for xss and sql injection  */}
          <Stack spacing={4}>{props.children}</Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default FormContainer;
