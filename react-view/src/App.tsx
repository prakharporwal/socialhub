import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import SimpleSidebar from "./components/SimpleSidebarWithHeader"
import LinkedinButton from "./components/buttons/LinkedinButton"
import LinkedinPostForm from "./components/LinkedPostForm"
import SidebarWithHeader from "./components/SimpleSidebarWithHeader"
import { Route, Router, Routes } from "react-router"
import SignInForm from "./components/SignInForm"

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

export const App = ()=>{
  return <>
  <Box height={"100vh"}>
    <SidebarWithHeader>
      <Routes>
      <Route path="/"></Route>
      <Route path="/post" element={<LinkedinPostForm/>} ></Route>
      <Route path="/signin" element={<SignInForm/>} ></Route>
      </Routes>
    </SidebarWithHeader>
  </Box>
  </>
}
