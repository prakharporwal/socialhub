import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Button, Heading, Image, Link, Text } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import notFoundRelaxation from "../images/notfound/notfound_relaxation.svg";
import notFoundPageTravelling from "../images/notfound/notfound_page_travelling.svg";
import notFoundWriter from "../images/notfound/notfound_writer.svg";
import notFoundCoffee from "../images/notfound/notfound_coffee.svg";
import notFoundCampfire from "../images/notfound/notfound_campfire.svg";

const images = [
  notFoundRelaxation,
  notFoundPageTravelling,
  notFoundWriter,
  notFoundCoffee,
  notFoundCampfire,
];
const NotFoundPage: React.FunctionComponent<any> = () => {
  const index = Math.round(Math.random() * 4);
  const navigate = useNavigate();

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
        <Button
          variant={"outline"}
          leftIcon={<FaChevronLeft />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Link as={ReactLink} to="/app" color={"blue"}>
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
