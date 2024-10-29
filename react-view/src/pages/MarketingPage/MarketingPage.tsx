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
  useToast,
} from "@chakra-ui/react";

import { Box } from "@chakra-ui/layout";
import { IoMdAnalytics, IoLogoBitcoin, IoMdSearch } from "react-icons/io";
import "./marketing.css";
import MarketingFooter from "./MarketingFooter";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "../../hooks/useQuery";

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
  const toast = useToast();
  const query = useQuery();
  useEffect(() => {
    if (auth.isAuthenticated) {
      let connectedLinkedin = query.get("linkedin");
      let connectedTwitter = query.get("twitter");

      if (connectedLinkedin === "success") {
        toast({
          status: "success",
          title: "Linkedin Account Connected!",
          duration: 6000,
        });
      }
      if (connectedTwitter === "success") {
        toast({
          status: "success",
          title: "Twitter Account Connected!",
          duration: 6000,
        });
      }
      navigate("/app/home");
    }
  }, [auth]);

  return (
    <Box overflowY="auto">
      <Container maxW={"6xl"} h={{ md: "80vh", sm: "50vh" }}>
        <Flex gap={4} padding={4}>
          <Button
            marginLeft={"auto"}
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
        </Flex>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
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
              colorScheme={"red"}
              variant={"solid"}
              px={6}
              _hover={{
                bg: "green.500",
                color: "white",
              }}
              onClick={() => {
                navigate("/shorts");
              }}
            >
              Shorts
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
      <Container maxW={"5xl"} py={12} h="120vh" ref={moreInfoRef}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4} textAlign={"center"}>
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
            <Heading>A Social Media Management Tool</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Manage all the social media accounts from one place
            </Text>
            <Box textAlign={"center"} color={"gray.500"}>
              <Text noOfLines={2}>
                Create, discuss and schedule posts for the best engagement
              </Text>
              <Text noOfLines={2}>
                Delegate and add people who can take care of your social media
                game.
              </Text>
            </Box>
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
                text={"Post Planning"}
              />
              <Feature
                icon={
                  <Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Engagment Planning"}
              />
              <Feature
                icon={<Icon as={IoMdSearch} color={"purple.500"} w={5} h={5} />}
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Discussion and Approvals"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={"images/marketing_img.jpeg"}
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
