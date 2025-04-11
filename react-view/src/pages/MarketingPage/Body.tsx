import { Box, Link, Flex, Image, Text, Button } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export function Body(props: any) {
  return (
    <Box p={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        justifyContent={"space-around"}
        alignItems={"center"}
        py={{ base: 20, md: 36 }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={8}
          w={{ base: "100%", md: "50%" }}
        >
          <Text
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            textAlign={"left"}
          >
            Social Media management made easy
          </Text>
          <Text
            fontSize={{ base: "md", sm: "2xl" }}
            color={"#2378C7"}
            textAlign={"justify"}
          >
            Create, Schedule, and Analyze your posts across multiple Social
            Media platforms
          </Text>
          <Box display={"flex"} gap={4} flexDirection={"row"}>
            <Box>
              <Link as={ReactLink} to={"/signin"}>
                <Button colorScheme={"blue"} mb={4}>
                  Get Started
                </Button>
              </Link>
              <Text fontSize={"xs"}>No credit card required!</Text>
            </Box>
            <Box>
              {/* Social Proof */}
              {/* <Text color={"blue"} fontSize={"sm"}>people are engaging with this website</Text> */}
            </Box>
          </Box>
        </Box>
        <Image w={"96"} src={"/main_cover.jpeg"} alt="main_cover" />
      </Flex>
    </Box>
  );
}
