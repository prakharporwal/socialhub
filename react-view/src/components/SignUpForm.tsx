import React from 'react';
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
import { useState } from "react";
import { Link as ReactLink } from 'react-router-dom';
import { useNavigate } from "react-router";
import './signin.css'

export default function SignUpForm() {
    const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [organisationId, setOrganisationId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const toast = useToast();

  const navigate = useNavigate();

  function submitSignUpForm() {
    console.log()
    setIsRegistering(true);

    if (organisationId ==="" || username==="" || email === "" || password === "" || !validateEmail(email)) {
      if (!toast.isActive("signup-error")) {
        toast({
          // todo add the username here
          id: "signup-error",
          title: "Invalid data cannot be empty",
          description: "Field empty",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsRegistering(false);
      return;
    }

    console.log(email, password, organisationId, username);
    fetch("https://api.yogveda.live/v1/signup", {
      method: "POST",
      body: JSON.stringify({organisation_id: organisationId, username: username, user_id: email, password: password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("failed to login");
      })
      .then((data) => {
        console.log(data.access_token);
        window.localStorage.setItem("access_token", data.access_token);
        window.localStorage.setItem("authenticated", "true");
        document.cookie = "access_token=" + data.access_token;
        toast({
          // todo add the user name here
          title: "Account Creation successful",
          description: "Logged in as {username}",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsRegistering(false);
      });
  }

  function validateEmail(email:any){
    if(email ==="")
       return false
    return true
  }

  return (
    <>
      <Flex className='signin-background' h={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} maxW={"5xl"}>SignUp into Organisation</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              To explore our all of our cool <Link as={ReactLink} to="/" color={"blue.400"}>features</Link>{" "}
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
            <FormControl id="orgname">
                <FormLabel>Organisation Id</FormLabel>
                <Input
                  type="text"
                  value={organisationId}
                  onChange={(e) => {
                    setOrganisationId(e.currentTarget.value);
                  }}
                />
              </FormControl>
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
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.currentTarget.value);
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
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.400",
                  }}
                  isLoading={isRegistering}
                  onClick={submitSignUpForm}
                >
                  Sign up
                </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
