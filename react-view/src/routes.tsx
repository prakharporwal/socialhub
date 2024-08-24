import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SidebarWithHeader from "./components/SimpleSidebarWithHeader";

/** LAZY IMPORT PAGES COMPONENTS */
const ForgotPasswordResetPage = lazy(
  () => import("./pages/ForgotPasswordResetPage")
);
const ForgotPasswordRequestPage = lazy(
  () => import("./pages/ForgotPasswordPage")
);
const MarketingPage = lazy(
  () => import(/* webpackChunkName: "marketing" */ "./pages/MarketingPage")
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "notFoundPage" */ "./pages/NotFoundPage")
);
const InstagramPage = lazy(
  () => import(/* webpackChunkName: "instagramPage" */ "./pages/InstagramPage")
);
const FacebookPage = lazy(
  () => import(/* webpackChunkName: "facebookPage" */ "./pages/FacebookPage")
);
const LinkedPostForm = lazy(
  () => import(/* webpackChunkName: "postForm" */ "./components/LinkedPostForm")
);
const PostingHistoryList = lazy(
  /* webpackChunkName: "postingHistory" */
  () => import("./components/PostingHistoryList")
);
const TwitterPage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/TwitterPage")
);
const LinkedinPage = lazy(
  () => import(/* webpackChunkName: "linkedinPage" */ "./pages/LinkedinPage")
);
const SignInPage = lazy(
  () => import(/* webpackChunkName: "signinPage" */ "./pages/SignInPage")
);
const SignUpPage = lazy(
  () => import(/* webpackChunkName: "signUpPage" */ "./pages/SignUpPage")
);

export const routeNames = {
  rootPath: "/app",
  protectedPath: "/admin",
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MarketingPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordRequestPage />,
  },
  {
    path: "/forgot-password-reset",
    element: <ForgotPasswordResetPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: routeNames.rootPath,
    element: <SidebarWithHeader />,
    children: [
      {
        path: "home",
        element: <PostingHistoryList />,
      },
      {
        path: "post/new",
        element: <LinkedPostForm />,
      },
      {
        path: "twitter",
        element: <TwitterPage />,
      },
      {
        path: "instagram",
        element: <InstagramPage />,
      },
      {
        path: "facebook",
        element: <FacebookPage />,
      },
      {
        path: "linkedin",
        element: <LinkedinPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
