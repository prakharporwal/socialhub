import { Box, Flex } from "@chakra-ui/react";

export function FeaturesList() {
  return (
    <Box p={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        justifyContent={"space-around"}
        alignItems={"center"}
        py={{ base: 20, md: 36 }}
      >
        
      </Flex>
    </Box>
  );
}
