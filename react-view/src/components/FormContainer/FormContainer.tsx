import React, { ReactNode } from "react";
import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";

type IProps = {
  headingText: string;
  description?: string;
  children: ReactNode;
};

const FormContainer: React.FunctionComponent<IProps> = (props) => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <AppOverView />
      <Flex
        flex={1}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"whitesmoke"}
      >
        <Stack
          spacing={4}
          mx={"auto"}
          minW={{ base: "md", md: "lg", lg: "xl" }}
          maxW={"xl"}
          py={12}
          px={6}
        >
          <Card>
            <CardHeader>
              <Stack align={"center"}>
                <Heading fontSize={"2xl"}>{props.headingText}</Heading>
                <Text fontSize={"md"} color={"gray.600"}>
                  {props.description}
                </Text>
              </Stack>
            </CardHeader>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              {/* // Todo: Form Validate and sanitize input for xss and sql injection  */}
              <Stack spacing={4}>{props.children}</Stack>
            </Box>
          </Card>
        </Stack>
      </Flex>
    </Flex>
  );
};

const AppOverView = () => {
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      h={"32vh"}
      flex={1}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={4}
      borderRadius={20}
      px={8}
    >
      <Heading as={"h1"}>Sociohub</Heading>
      <h2>Control across all your socials</h2>
      <Image
        src="/onboarding-poster.webp"
        alt="helper"
        maxH={"lg"}
        borderRadius={12}
      />
    </Flex>
  );
};

export default FormContainer;
