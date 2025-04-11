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
import { Header } from "./Header";
import { Body } from "./Body";
import { FeaturesList } from "./FeaturesList";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export const Feature = ({ text, icon, iconBg }: FeatureProps) => {
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
      <Header />
      <Body moreInfoRef={moreInfoRef} />
      <FeaturesList />
      <MarketingFooter />
    </Box>
  );
};

export default MarketingPage;
