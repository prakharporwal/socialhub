import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import { FaMailBulk } from "react-icons/fa";
import { SiGmail, SiMaas, SiMailDotRu } from "react-icons/si";

const NotFoundPage: React.FunctionComponent<any> = () => {
  const images = [
    "notfound_relaxation.svg",
    "notfound_page_travelling.svg",
    "notfound_writer.svg",
    "notfound_coffee.svg",
    "notfound_campfire.svg",
  ];
  const index = Math.round(Math.random() * 4);

  console.log(index);
  return (
    <Box h={"100vh"} display={"grid"} placeItems={"center"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Image src={images[index]} alt="page not found" h={"20vh"} />
        <Heading>Oops! page not found</Heading>
        <Link as={ReactLink} to="/" color={"blue"}>
          Head over to homepage
        </Link>
      </Box>
      <Text>
        If you think this is a mistake contact us at
        <Text color={"blue"}>prakharporwal99@gmail.com</Text>
      </Text>
    </Box>
  );
};

export default NotFoundPage;
