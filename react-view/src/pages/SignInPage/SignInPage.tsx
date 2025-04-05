import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router";
import CONSTANTS from "../../EnvConstant";
import FormContainer from "../../components/FormContainer";
import "./signin.css";
import { useAuth } from "../../hooks/useAuth";

const SignInPage: React.FunctionComponent<any> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const toast = useToast();

  const auth = useAuth();

  const navigate = useNavigate();

  function submitSignInForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    fetch(CONSTANTS.api_server_url + "/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        user_id: email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Incorrect credentials");
      })
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("authenticated", "true");
        window.localStorage.setItem("current_username", data.username);
        window.localStorage.setItem(
          "organisation_group_id",
          data.organisation_group_id
        );

        document.cookie =
          "access_token=" + data.access_token + ";Path=/;" + "Max-Age=18000;";

        toast({
          // todo add the user name here
          title: "Login successful",
          description: `Logged in as ${data.username}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/app/home");
      })
      .catch((err) => {
        console.log(err);
        if (!toast.isActive("login-api-failed")) {
          toast({
            // todo add the user name here
            id: "login-api-failed",
            title: "Login Failed",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/app/home");
    }
  }, [auth]);

  return (
    <FormContainer headingText={"Login"} description={"Sign in to start creating your posts"}>
      <form onSubmit={submitSignInForm}>
        {/* <FormControl id="organisation-id">
          <FormLabel>Organisation Id</FormLabel>
          <Input
            type="text"
            value={organisationId}
            onChange={(e) => {
              setOrganisationId(e.currentTarget.value);
            }}
          />
        </FormControl> */}
        {/* // keeping it as username because chrome picks the email to save from this field id */}
        <FormControl id="username" mb={2} isRequired>
          <FormLabel mb={2}>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl id="password" mt={4} isRequired>
          <FormLabel mb={2}>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl id="submit-button" mt={6}>
          <Stack spacing={6}>
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
              <Link as={RouterLink} to="/forgot-password" color={"blue.400"}>
                Forgot password?
              </Link>
            </Stack>
            <Button
              type="submit"
              isLoading={isLoggingIn}
            >
              Sign in
            </Button>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
          </Stack>
          <Link as={RouterLink} to="/signup" color={"blue.400"}>
            Create Account
          </Link>
        </FormControl>
      </form>
    </FormContainer>
  );
};

export default SignInPage;
