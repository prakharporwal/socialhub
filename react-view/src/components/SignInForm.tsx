import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";

export default function SignInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const toast = useToast();

  const navigate = useNavigate();

  function submitSignInForm() {
    setIsLoggingIn(true);

    if (email === "" || password === "") {
      if (!toast.isActive("login-error")) {
        toast({
          // todo add the username here
          id: "login-error",
          title: "Invalid data cannot be empty",
          description: "Email and Password Field empty",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsLoggingIn(false);
      return;
    }

    console.log(email, password, rememberMe);
    fetch("https://api.yogveda.live/v1/login", {
      method: "POST",
      body: JSON.stringify({ user_id: email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token);
        window.localStorage.setItem("access_token", data.access_token);
        window.localStorage.setItem("authenticated", "true");
        document.cookie = "access_token=" + data.access_token;
        toast({
          // todo add the user name here
          title: "Login successful",
          description: "Logged in as {username}",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/post");
      })
      .catch(() => {})
      .finally(() => {
        setIsLoggingIn(false);
      });
  }

  return (
    <>
      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.currentTarget.checked);
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.400",
                  }}
                  isLoading={isLoggingIn}
                  onClick={submitSignInForm}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
