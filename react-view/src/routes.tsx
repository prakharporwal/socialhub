import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

/** LAZY IMPORT PAGES COMPONENTS */

const WebHeader = lazy(
  () => import(/* webpackChunkName: "webHeader" */ "./components/WebHeader")
);

const MultiWidgetPage = lazy(
  () => import(/* webpackChunkName: "multiWidgetPage" */ "./pages/MultiWidgetPage")
);

const SidebarWithHeader = lazy(
  () =>
    import(
      /* webpackChunkName: "SidebarWithHeader" */ "./components/SimpleSidebarWithHeader"
    )
);

const ForgotPasswordResetPage = lazy(
  () =>
    import(
      /* webpackChunkName: "forgotPasswordResetPage" */ "./pages/ForgotPasswordResetPage"
    )
);
const ForgotPasswordRequestPage = lazy(
  () =>
    import(
      /* webpackChunkName: "forgotPasswordRequest" */ "./pages/ForgotPasswordPage"
    )
);
const MarketingPage = lazy(
  () => import(/* webpackChunkName: "marketing" */ "./pages/MarketingPage")
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "notFoundPage" */ "./pages/NotFoundPage")
);
const FacebookPage = lazy(
  () => import(/* webpackChunkName: "facebookPage" */ "./pages/FacebookPage")
);
const AppSettingsPage = lazy(
  () =>
    import(/* webpackChunkName: "settingsPage" */ "./pages/AppSettingsPage")
);
const AnalyticsDashboardPage = lazy(
  () =>
    import(/* webpackChunkName: "analyticsDashboardPage" */ "./pages/AnalyticsDashboardPage")
);
const MyProfilePage = lazy(
  () =>
    import(/* webpackChunkName: "myProfilePage" */ "./pages/MyProfilePage")
);
const LinkedPostForm = lazy(
  () => import(/* webpackChunkName: "postcreationForm" */ "./pages/PostCreationPage")
);
const PostingHistoryList = lazy(
  /* webpackChunkName: "postingHistoryTablePage" */
  () => import("./pages/PostHistoryTablePage")
);
const TwitterPage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/TwitterPage")
);
const InstagramPage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/InstagramPage")
);
const YoutubePage = lazy(
  () => import(/* webpackChunkName: "twitterPage" */ "./pages/YoutubePage")
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

const ShortsFeedPage = lazy(
  () => import(/* webpackChunkName: "signUpPage" */ "./pages/ShortsFeedPage")
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
    path: "/:slug/p/:itemId",
    element:<MultiWidgetPage/>
  },
  // {
  //   path: "/shorts",
  //   element: <ShortsFeedPage />,
  // },
  {
    path: "/",
    element: <WebHeader />,
    children: [
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
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: routeNames.rootPath,
    element: <SidebarWithHeader />,
    children: [
      {
        path: "home",
        element: 
        <PostingHistoryList />,
      },
      {
        path: "settings",
        element: <AppSettingsPage />,
      },
      {
        path: "analytics/dashboard",
        element: <AnalyticsDashboardPage />,
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
        path: "youtube",
        element: <YoutubePage />,
      },
      {
        path: "facebook",
        element: <FacebookPage />,
      },
      {
        path: "linkedin",
        element: <LinkedinPage />,
      },
      {
        path: "profile",
        element: <MyProfilePage />,
      },
    ],
  },
]);
