import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export function Header() {
  let navigate = useNavigate();
  return (
    <Flex gap={4} p={4} justifyContent={"space-between"}>
      <Box mx={{ base: 2, md: 4 }} my={2}>
        <Image src="/sociohub.png" alt="Logo" w={{ base: 36, md: 40 }} />
      </Box>
      <Flex
        flex={1}
        direction={"row"}
        gap={6}
        fontSize={"lg"}
        justifyContent={"center"}
        alignItems={"center"}
        mx={8}
        display={{ base: "none", md: "flex" }}
      >
        <Text fontWeight={"medium"} fontSize={"md"}>
          Home
        </Text>
        <Text fontWeight={"medium"} fontSize={"md"}>
          About Us
        </Text>
        <Text fontWeight={"medium"} fontSize={"md"}>
          Pricing
        </Text>
        <Text fontWeight={"medium"} fontSize={"md"}>
          Blog
        </Text>
      </Flex>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={4}
        mr={{ base: 1, lg: 8 }}
      >
        <Button
          display={{ base: "none", md: "block" }}
          marginLeft={"auto"}
          colorScheme={"blue"}
          rounded={"lg"}
          px={6}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Get Started
        </Button>
        <Button
          display={"block"}
          colorScheme={"blue"}
          variant={"outline"}
          rounded={"lg"}
          px={6}
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign In
        </Button>
      </Box>
    </Flex>
  );
}
