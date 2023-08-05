import { FormEvent, ReactText } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useNavigate } from "react-router";
import CONSTANTS from "../../CONSTANTS";
import FormContainer from "../../components/FormContainer";
import ReactGA from "react-ga";
import "./signup.css";

ReactGA.initialize("G-DWQ4JNSKQE");
ReactGA.pageview(window.location.pathname + window.location.search);

const SignUpPage: React.FunctionComponent<any> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [organisationId, setOrganisationId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const toast = useToast();

  const navigate = useNavigate();

  function submitSignUpForm(e: FormEvent<HTMLFormElement>) {
    console.log(e.preventDefault());
    setIsRegistering(true);

    if (
      organisationId === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
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

    console.log(email, password, organisationId, username);

    fetch(CONSTANTS.api_server_url + "/v1/signup", {
      method: "POST",
      body: JSON.stringify({
        organisation_group_id: organisationId,
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("failed to login");
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

        if (data?.access_token !== undefined && data?.access_token !== "") {
          window.localStorage.setItem("access_token", data.access_token);
          window.localStorage.setItem("current_username", data.username);
          window.localStorage.setItem("current_user_email", data.user_email);
          window.localStorage.setItem("authenticated", "true");
          document.cookie = "access_token=" + data.access_token;
        } else {
          console.error("access token is empty or undefined");
        }
        navigate("/home");
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

    console.log(e.preventDefault());
  }

  function validateEmail(email: any) {
    if (email === "") return false;
    return true;
  }

  return (
    <FormContainer headingText="Signup into Organisation">
      <form onSubmit={submitSignUpForm}>
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
        </Stack>
        <Button
          marginTop={"4"}
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.400",
          }}
          type="submit"
          isLoading={isRegistering}
        >
          Sign up
        </Button>
      </form>
    </FormContainer>
  );
};

export default SignUpPage;
