import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import FormContainer from "../../components/FormContainer";

import CONSTANTS from "../../EnvConstant";
import { useAuth } from "../../hooks/useAuth";

const ForgotPasswordRequestPage: React.FunctionComponent<any> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [organisationId, setOrganisationId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const toast = useToast();
  const auth = useAuth();

  const submitForgotPasswordForm = (e: any) => {
    e.preventDefault();

    console.debug({ userEmail, organisationId });

    if (userEmail === "") {
      toast({ title: "Fields cannot be empty!", status: "error" });
      return;
    }

    setIsSubmitting(true);

    fetch(CONSTANTS.api_server_url + "/api/v1/password/forgot/request", {
      headers: {
        "access-token": auth.accessToken || "",
      },
      method: "POST",
      body: JSON.stringify({
        user_email: userEmail,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .then((data) => {
        console.log(data);
        toast({
          status: "success",
          title: "Sent Reset link to your Email",
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          status: "error",
          title: "Failed to submit request!",
          duration: 5000,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormContainer headingText="Forgot Password">
      <Box>
        <form onSubmit={submitForgotPasswordForm}>
          {/* <FormControl id="organisation-id" isRequired>
            <FormLabel>Organisation Id</FormLabel>
            <Input
              type="text"
              value={organisationId}
              required={true}
              onChange={(e) => {
                setOrganisationId(e.currentTarget.value);
              }}
            />
          </FormControl> */}
          <FormControl id="user-email" isRequired>
            <FormLabel>Enter your registered Email</FormLabel>
            <Input
              type="email"
              value={userEmail}
              required={true}
              onChange={(e) => {
                setUserEmail(e.currentTarget.value);
              }}
            />
            <Box h={4}></Box>
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              Send Reset Link
            </Button>
          </FormControl>
        </form>
      </Box>
    </FormContainer>
  );
};

export default ForgotPasswordRequestPage;
