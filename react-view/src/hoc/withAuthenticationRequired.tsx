import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Box } from "@chakra-ui/react";

const withAuthenticationRequired = (Ele: React.FunctionComponent<any>) => {
  return function (props: any) {
    const authValue = useAuth();
    return (
      <Box h={"calc(100vh - 4rem)"} overflowY={"auto"}>
        {authValue.isAuthenticated ? (
          <Ele {...props} />
        ) : (
          <Navigate to="/app/signin" replace />
        )}
      </Box>
    );
  };
};

export default withAuthenticationRequired;
