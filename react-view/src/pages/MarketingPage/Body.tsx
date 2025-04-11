import {
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

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
        </Box>
        <Image w={"96"} src={"/main_cover.jpeg"} alt="main_cover" />
      </Flex>
    </Box>
  );
}
