import React from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

import { Box, Link } from "@chakra-ui/layout";
import {Link as ReactLink} from "react-router-dom";

import "./marketing.css";

const MarketingPage: React.FunctionComponent<any> = (props) => {
  return (
    <Box className="marketing" h="100vh">
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Social media posting{" "}
            <Text as={"span"} color={"orange.400"}>
              made easy
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Link as={ReactLink} to="/signin"><Button
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
              
            >
              Get started
            </Button>
            </Link>
            <Button rounded={"full"} px={6}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MarketingPage;
