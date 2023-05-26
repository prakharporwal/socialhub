import React from "react";

import { Route, Routes } from "react-router";
import SignInForm from "./components/SignInForm";
import LinkedPostForm from "./components/LinkedPostForm";
import PostingHistoryList from "./components/PostingHistoryList";
import MarketingPage from "./pages/MarketingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpForm from "./components/SignUpForm";
import TwitterPage from "./pages/TwitterPage";

export const App = () => {

  return (
    <>
      <Routes>
      <Route path='*' element={<NotFoundPage />} />
        <Route path="/" element={<MarketingPage />}></Route>
        <Route path="/twitter" element={<TwitterPage />}></Route>
        <Route path="/post/new" element={<LinkedPostForm />}></Route>
        <Route path="/posts" element={<PostingHistoryList />}></Route>
        <Route path="/signin" element={<SignInForm />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
      </Routes>
    </>
  );
};
