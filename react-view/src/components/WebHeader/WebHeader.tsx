import { Link as ReactLink } from "react-router-dom";
import { Box, Flex, Image, Link } from "@chakra-ui/react";

import { Outlet } from "react-router";

export default function WebHeader() {
  return (
    <Box>
      <Flex
        position={"absolute"}
        height={"14"}
        w={"full"}
        bg={"white"}
        borderBottomRightRadius={8}
        borderBottomLeftRadius={8}
      >
        <Link as={ReactLink} href="/">
          <Box mx={{ base: 2, md: 4 }} my={4}>
            <Image src="/sociohub.png" alt="Logo" w={{ base: 36, md: 40 }} />
          </Box>
        </Link>
      </Flex>
      <Outlet />
    </Box>
  );
}
