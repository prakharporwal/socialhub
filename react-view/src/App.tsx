import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";

import { appRouter } from "./routes";

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ChakraProvider>
          <Suspense fallback={<LoadingShell />}>
            <RouterProvider router={appRouter} />
          </Suspense>
        </ChakraProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
