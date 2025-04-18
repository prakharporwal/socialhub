import { FormEvent } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
  Flex,
  Spacer,
  Box,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import CONSTANTS from "../../EnvConstant";
import FormContainer from "../../components/FormContainer";
import { SiGoogle } from "react-icons/si";

const SignUpPage: React.FunctionComponent<any> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  function submitSignUpForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRegistering(true);

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      !validateEmail(email)
    ) {
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

    if (password !== confirmPassword) {
      if (!toast.isActive("password-mismatch")) {
        toast({
          id: "password-mismatch",
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsRegistering(false);
      return;
    }

    fetch(CONSTANTS.api_server_url + "/api/v1/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          return data;
        }

        throw new Error(data.message);
      })
      .then((data) => {
        console.log(data.access_token);
        toast({
          // todo add the user name here
          title: "Account Creation successful",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        if (data?.access_token) {
          window.localStorage.setItem("access_token", data.access_token);
          window.localStorage.setItem("current_username", data.username);
          window.localStorage.setItem("current_user_email", data.user_email);
          window.localStorage.setItem("authenticated", "true");
          document.cookie = "access_token=" + data.access_token;
        } else {
          console.error("access token is empty or undefined");
        }
        navigate("/app/home");
      })
      .catch((err) => {
        console.log(err);
        toast({
          // todo add the user name here
          title: "Signup Failed",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsRegistering(false);
      });
  }

  function validateEmail(email: any) {
    if (email === "") return false;
    return true;
  }

  // function handleGoogleAuth() {
  // fetch(CONSTANTS.api_server_url + "/v1/google/oauth2/signup")
  //   .then((res) => res.json())
  //   .then()
  //   .catch()
  //   .finally();
  // }

  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params: any = {
      client_id:
        "400956389014-h8i654igfoqm53ud0694bhk649kigaur.apps.googleusercontent.com",
      redirect_uri: "http://localhost:8080/v1/google/oauth2/signup/callback",
      response_type: "token",
      scope: "openid email profile",
      include_granted_scopes: "true",
      state: "pass-through value",
      prompt: "select_account",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  return (
    <FormContainer
      headingText="Create Account"
      description={"Create Account to start managing your posts"}
    >
      <form onSubmit={submitSignUpForm}>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          {/* Will use org Id concept later when we have a org */}
          {/* <FormControl id="orgname">
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
          <FormControl id="username" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel mt={2}>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => {
                const inputText = e.currentTarget.value;
                setUsername(inputText.toLowerCase());
              }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel mt={2}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel mt={2}>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
              }}
            />
          </FormControl>
          {/* Spacer */}
          <Box h={4}></Box>
          <Flex w={"full"}>
            <Button
              flex={1}
              colorScheme="gray"
              type="submit"
              isLoading={isRegistering}
            >
              Sign up
            </Button>
          </Flex>
          <Box py={4} w={"full"} textAlign={"end"}>
            <Link as={RouterLink} to="/signin" color={"blue.400"}>
              Already have an account ?
            </Link>
          </Box>
        </Flex>
      </form>
      {/* <Button leftIcon={<SiGoogle />} onClick={oauthSignIn}>
        Continue With Google
      </Button> */}
    </FormContainer>
  );
};

export default SignUpPage;
