import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import CustomEditableText from "../../components/ui/CustomEditableText";
import { logOut } from "../../utils/logoutUtils";
import { useNavigate } from "react-router";

const formLayout = {
  title: "Your Profile Details",
};

export default function MyProfilePage() {
  let navigate = useNavigate();

  function logoutHandler() {
    logOut();
    navigate("/");
  }
  return (
    <Box m={2} p={4}>
      <Card width={"full"}>
        <CardHeader>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {formLayout.title}
          </Text>
        </CardHeader>
        <CardBody>
          <FormControl>
            <Box
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"wrap"}
              gap={4}
              width={{ base: "full", lg: "75vw", xl: "60vw" }}
            >
              <Flex direction={"column"} flex={1} px={4}>
                <LabelText text={"Username"} />
                <CustomEditableText
                  text={window.localStorage.getItem("current_username") || ""}
                />
              </Flex>
              <Flex direction={"column"} flex={1} px={4}>
                <LabelText text={"Your Email"} />
                {/* TODO: connect email details here */}
                <CustomEditableText
                  text={window.localStorage.getItem("user_email") || ""}
                />
              </Flex>
            </Box>
            {/* <Box my={4}>
              <Flex direction={'column'} flex={1} px={4}>
                <LabelText text={"Organisation"} />
                <CustomEditableText text={"Sociohub"} />
              </Flex>
            </Box> */}
            {/* <Box my={4}>
              <Flex direction={'column'} flex={1} px={4}>
                <LabelText text={"Notification Preference"} />
                <CustomEditableText text={"Sociohub"} />
              </Flex>
            </Box> */}
          </FormControl>
        </CardBody>
        <CardFooter pos={"relative"} mb={8}>
          <Flex pos="absolute" right={32} top={0} gap={8}>
            <Button variant={"ghost"} colorScheme="blue">
              Update Details
            </Button>
            <Button variant={"outline"} onClick={logoutHandler}>
              Logout
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
}

const LabelText = ({ text }: { text: string }) => {
  return (
    <FormLabel
      pt={2}
      pl={2}
      fontWeight={"bold"}
      display={"grid"}
      placeItems={"start"}
      whiteSpace={"nowrap"}
      w={{ base: 28, md: 32 }}
    >
      {text} {":"}
    </FormLabel>
  );
};
