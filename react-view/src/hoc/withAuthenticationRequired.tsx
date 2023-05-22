import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import SidebarWithHeader from "../components/SimpleSidebarWithHeader";

const withAuthenticationRequired = (Ele: React.FunctionComponent<any>) => {
  return function (props: any) {
    const authValue = useAuth();
    return (
      <SidebarWithHeader>
        {authValue.isAuthenticated ? (
          <Ele {...props} />
        ) : (
          <Navigate to="/signin" replace />
        )}
      </SidebarWithHeader>
    );
  };
};

export default withAuthenticationRequired;
