import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";
import { defaultTheme } from "./themes";
import { appRouter } from "./routes";

import { PostHogProvider } from "posthog-js/react";

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST || ""
};

export const App = () => {
  return (
    <React.StrictMode>
      <PostHogProvider
        apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY || ""}
        options={options}
      >
        <ErrorBoundary>
          <ChakraProvider theme={defaultTheme}>
            <Suspense fallback={<LoadingShell />}>
              <RouterProvider router={appRouter} />
            </Suspense>
          </ChakraProvider>
        </ErrorBoundary>
      </PostHogProvider>
    </React.StrictMode>
  );
};
