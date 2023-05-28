import { Button, ButtonProps, Flex, useColorMode } from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ColorModeToggleButton(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    /**
     * Ideally, only the button component should be used (without Flex).
     * Props compatible with <Button /> are supported.
     */
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: "none" }}
        w="fit-content"
        {...props}
      >
        {colorMode === "light" ? <BsMoon /> : <BsSun />}
      </Button>
    </Flex>
  );
}
