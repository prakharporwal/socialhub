import { FormEvent, useMemo, useState } from "react";
import FormContainer from "../../components/FormContainer";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import CONSTANTS from "../../CONSTANTS";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "../../hooks/useQuery";

const ForgotPasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = useQuery().get("token");
  const toast = useToast();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newPassword.localeCompare(confirmPassword) !== 0) {
      toast({
        id: "password-reset",
        title: "Password do not match!",
        status: "error",
      });
      return;
    }

    setIsSubmitting(true);

    fetch(CONSTANTS.api_server_url + "/v1/password/forgot/reset", {
      method: "POST",
      body: JSON.stringify({ new_password: newPassword, token: token }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("api call failed ! " + res.status);
      })
      .then((data) => {
        console.log(data);
        toast({
          id: "password-reset",
          status: "success",
          title: "Password Changed!",
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <FormContainer headingText="Create New Password">
      <Box>
        <form onSubmit={handleFormSubmit}>
          <FormControl id="new-password" isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                required={true}
                onChange={(e) => {
                  setNewPassword(e.currentTarget.value);
                }}
              />
              <InputRightElement>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                  tabIndex={-1}
                  icon={showNewPassword ? <FaEye /> : <FaEyeSlash />}
                  onClick={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Spacer h="4"></Spacer>
          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                required={true}
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
              />
              <InputRightElement>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  tabIndex={-1}
                  icon={showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              marginTop={"4"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.400",
              }}
              type="submit"
              isLoading={isSubmitting}
            >
              Update Password
            </Button>
          </FormControl>
        </form>
      </Box>
    </FormContainer>
  );
};

export default ForgotPasswordResetPage;
