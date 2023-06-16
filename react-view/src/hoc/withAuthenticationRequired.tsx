import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import SidebarWithHeader from "../components/SimpleSidebarWithHeader";
import { Box } from "@chakra-ui/react";

const withAuthenticationRequired = (Ele: React.FunctionComponent<any>) => {
  return function (props: any) {
    const authValue = useAuth();
    return (
      <SidebarWithHeader>
        <Box h={"calc(100vh - 4rem)"} overflowY={"auto"}>
          {authValue.isAuthenticated ? (
            <Ele {...props} />
          ) : (
            <Navigate to="/signin" replace />
          )}
        </Box>
      </SidebarWithHeader>
    );
  };
};

export default withAuthenticationRequired;
