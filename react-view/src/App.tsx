import React from "react";

import { Route, Routes } from "react-router";
import LinkedPostForm from "./components/LinkedPostForm";
import PostingHistoryList from "./components/PostingHistoryList";
import MarketingPage from "./pages/MarketingPage";
import NotFoundPage from "./pages/NotFoundPage";
import TwitterPage from "./pages/TwitterPage";
import InstagramPage from "./pages/InstagramPage";
import FacebookPage from "./pages/FacebookPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordResetPage from "./pages/ForgotPasswordResetPage.tsx";
import ForgotPasswordRequestPage from "./pages/ForgotPasswordPage";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import LinkedinPage from "./pages/LinkedinPage";

export const App = () => {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <ChakraProvider>
            <ColorModeScript />
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
          </ChakraProvider>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
};
