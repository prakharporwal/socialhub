import React, { ReactElement, useEffect, useRef } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Flex,
  Image,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";

import { Box } from "@chakra-ui/layout";
import { IoMdAnalytics, IoLogoBitcoin, IoMdSearch } from "react-icons/io";
import "./marketing.css";
import MarketingFooter from "./pages/MarketingPage/MarketingFooter";
import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const MarketingPage: React.FunctionComponent<any> = (props) => {
  let moreInfoRef = useRef<HTMLDivElement>(null);
  let navigate = useNavigate();
  let auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/posts");
  }, []);

  return (
    <Box overflowY="auto">
      <Container maxW={"5xl"} h="100vh">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            as={"h1"}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Social Media Management
            <br />
            <Text as={"span"} color={"green.400"}>
              made easy
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Get Started
            </Button>
            <Button
              colorScheme={"green"}
              variant={"outline"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
                color: "white",
              }}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </Button>
            <Button
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
              onClick={() => {
                if (moreInfoRef.current) {
                  moreInfoRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Container maxW={"5xl"} py={12} h="90vh" ref={moreInfoRef}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Our Story
            </Text>
            <Heading>A digital Product design agency</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Feature
                icon={
                  <Icon as={IoMdAnalytics} color={"yellow.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={"Business Planning"}
              />
              <Feature
                icon={
                  <Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Financial Planning"}
              />
              <Feature
                icon={<Icon as={IoMdSearch} color={"purple.500"} w={5} h={5} />}
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Market Analysis"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      <MarketingFooter />
    </Box>
  );
};

export default MarketingPage;
