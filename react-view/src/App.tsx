import React, { lazy, Suspense } from "react";
import { Route, RouterProvider, Routes } from "react-router";
import { ChakraProvider, ColorModeScript, Switch } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";
import { createBrowserRouter } from "react-router-dom";

import { appRouter } from "./routes";
// const MarketingPage = lazy(
//   () =>
//     import(/* webpackChunkName: "marketing" */ "./pages/MarketingPage/index.js")
// );

// export const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <MarketingPage />,
//   },
// ]);

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ColorModeScript />
        <ChakraProvider>
          <Suspense fallback={<LoadingShell />}>
            <RouterProvider router={appRouter} />
          </Suspense>
        </ChakraProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
