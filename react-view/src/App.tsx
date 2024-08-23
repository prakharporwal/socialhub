import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingShell from "./components/ui/LoadingShell";
/** LAZY IMPORT PAGES COMPONENTS */
const ForgotPasswordResetPage = lazy(
  () => import("./pages/ForgotPasswordResetPage.tsx")
);
const ForgotPasswordRequestPage = lazy(
  () => import("./pages/ForgotPasswordPage")
);
const MarketingPage = lazy(() => import("./pages/MarketingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const InstagramPage = lazy(() => import("./pages/InstagramPage"));
const FacebookPage = lazy(() => import("./pages/FacebookPage"));
const LinkedPostForm = lazy(() => import("./components/LinkedPostForm"));
const PostingHistoryList = lazy(
  () => import("./components/PostingHistoryList")
);
const TwitterPage = lazy(() => import("./pages/TwitterPage"));
const LinkedinPage = lazy(() => import("./pages/LinkedinPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

export const App = () => {
  return (
    <>
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <ChakraProvider>
              <ColorModeScript />
              <Suspense fallback={<LoadingShell />}>
                <Routes>
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/" element={<MarketingPage />}></Route>
                  <Route path="/twitter" element={<TwitterPage />}></Route>
                  <Route path="/linkedin" element={<LinkedinPage />}></Route>
                  <Route path="/instagram" element={<InstagramPage />}></Route>
                  <Route path="/facebook" element={<FacebookPage />}></Route>
                  <Route path="/post/new" element={<LinkedPostForm />}></Route>
                  <Route path="/home" element={<PostingHistoryList />}></Route>
                  <Route path="/signin" element={<SignInPage />}></Route>
                  <Route path="/signup" element={<SignUpPage />}></Route>
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordRequestPage />}
                  ></Route>
                  <Route
                    path="/forgot-password-reset"
                    element={<ForgotPasswordResetPage />}
                  ></Route>
                </Routes>
              </Suspense>
            </ChakraProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    </>
  );
};
