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
          <Image src="/logo.png" alt="Logo" w={"32"} h={"10"} m={2} />
        </Link>
      </Flex>
      <Outlet />
    </Box>
  );
}
