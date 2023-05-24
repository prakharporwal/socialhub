import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import SimpleSidebar from "./components/SimpleSidebarWithHeader";
import LinkedinButton from "./components/buttons/LinkedinButton";
import SidebarWithHeader from "./components/SimpleSidebarWithHeader";
import { Navigate, Route, Routes } from "react-router";
import SignInForm from "./components/SignInForm";
import ProtectedRoute from "./components/authenticated/ProtectedRoute";
import LinkedPostForm from "./components/LinkedPostForm";
import PostingHistoryList from "./components/PostingHistoryList";
import MarketingPage from "./MarketingPage";
import NotFoundPage from "./NotFoundPage";
import SignUpForm from "./components/SignUpForm";

// export const App = () => (
//   <ChakraProvider theme={theme}>
//     <Box textAlign="center" fontSize="xl">
//       <Grid minH="100vh" p={3}>
//         <ColorModeSwitcher justifySelf="flex-end" />
//         <VStack spacing={8}>
//           <Logo h="40vmin" pointerEvents="none" />
//           <Text>
//             Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
//           </Text>
//           <Link
//             color="teal.500"
//             href="https://chakra-ui.com"
//             fontSize="2xl"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn Chakra
//           </Link>
//         </VStack>
//       </Grid>
//     </Box>
//   </ChakraProvider>
// )

export const App = () => {
  return (
    <>
      <Routes>
      <Route path='*' element={<NotFoundPage />} />
        <Route path="/" element={<MarketingPage />}></Route>
        <Route path="/post/new" element={<LinkedPostForm />}></Route>
        <Route path="/posts" element={<PostingHistoryList />}></Route>
        <Route path="/signin" element={<SignInForm />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
      </Routes>
    </>
  );
};
