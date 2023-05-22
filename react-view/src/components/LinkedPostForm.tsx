import React, { useContext, useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  useToast,
  useColorModeValue,
  Checkbox,
  Stack,
  Link,
  Spacer,
  Text,
  Center,
  SelectField,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { FaClock, FaLinkedin } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import { getCookie } from "../utils/cookieUtils";
import { FiSend } from "react-icons/fi";

const LinkedinPostForm: React.FunctionComponent<any> = () => {
  const toast = useToast();
  const [type, setType] = useState<string>("text");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingScheduled, setIsSubmittingScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState((new Date()).toISOString().substring(0,16))

  const [pollOptions, setPollOptions] = useState([
    { value: "monday", id: 1 },
    { value: "tuesday", id: 2 },
  ]);

  useEffect(()=>{
    console.log(scheduledTime)
  },[scheduledTime])

  const handleSubmitPost = async () => {
    setIsSubmitting(true);
    if (content === "" || type === "") {
      setIsSubmitting(false);
      if (!toast.isActive("post-submit-error")) {
        toast({
          id: "post-submit-error",
          status: "error",
          title: "Form Empty",
          description: "Content and type cannot be empty",
        });
      }

      return;
    }

    // debugger;
    // await fetch("https://api.yogveda.live/app/linkedin/post", {
    //   headers: {
    //     "access-token": window.localStorage.getItem("access_token") || "",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     content_type: type,
    //     text: "Hello",
    //     data: {
    //       author: "",
    //       commentary: "",
    //       visibility: "PUBLIC",
    //       distribution: {
    //         feedDistribution: "MAIN_FEED",
    //         targetEntities: [],
    //         thirdPartyDistributionChannels: [],
    //       },
    //       lifecycleState: "PUBLISHED",
    //       isReshareDisabledByAuthor: false,
    //     },
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch()
    //   .finally();

    await fetch("https://api.yogveda.live/app/linkedin/post", {
      headers: {
        "access-token": window.localStorage.getItem("access_token") || "",
      },
      method: "POST",
      body: JSON.stringify({
        content_type: type,
        text: content,
        data: {
          author: "",
          commentary: content,
          visibility: "PUBLIC",
          distribution: {
            feedDistribution: "MAIN_FEED",
            targetEntities: [],
            thirdPartyDistributionChannels: [],
          },
          lifecycleState: "PUBLISHED",
          isReshareDisabledByAuthor: false,
        },
      }),
    })
      .then((res) => {
        if (res.ok || res.status === 201) {
          return res.json();
        }
        console.log(res.text);
        throw new Error("creating post request failed!");
      })
      .then((data) => {
        if (!toast.isActive("post-submit-api-success")) {
          toast({
            id: "post-submit-api-success",
            status: "success",
            title: "Submitted Post to Linkedin",
            description: "Posting now depends on linkedin",
          });
        }
      })
      .catch((err) => {
        if (!toast.isActive("post-submit-api-error")) {
          toast({
            id: "post-submit-api-error",
            status: "error",
            title: "Posting Failed",
            description: "Try again sometime later!",
          });
        }
      })
      .finally(() => {
        console.log(content, type);
        setIsSubmitting(false);
      });

    return;
  };


  async function handleConnectLinkedinAccount(){
     await fetch("https://api.yogveda.live" + `/app/linkedin/oauth/access/initiate`, {
      method: "get",
      headers: {
        "access-token": window.localStorage.getItem("access_token") || "",
      },
    })
      .then((res) => {
        let x = res.json();
        return x;
      })
      .then((data) => {
        console.log("data",data);
        window.location.replace(data.redirect_uri)
      }).finally(()=>{
        
      })
  }


  function handleSubmitSchedulePost(){
    setIsSubmittingScheduled(true)

    fetch("https://api.yogveda.live"+"/app/linkedin/schedule/post",{
      method: "POST",
      headers: {
       "access-token": window.localStorage.getItem("access_token") || ""
      },
      body: JSON.stringify({
        post_type: type,
        post_json: {
          author: "",
          commentary: content,
          visibility: "PUBLIC",
          distribution: {
            feedDistribution: "MAIN_FEED",
            targetEntities: [],
            thirdPartyDistributionChannels: [],
          },
          lifecycleState: "PUBLISHED",
          isReshareDisabledByAuthor: false,
        },
        scheduled_at: scheduledTime
      })
    })
    .then(res=>res.json())
    .then(data => {
      console.log(data)})
    .catch(()=>{})
    .finally(()=>{
      setIsSubmittingScheduled(false)
    })
  }

  return (
    <><Button
    bg={"blue.400"}
    color={"white"}
    _hover={{
      bg: "blue.500",
    }}
    colorScheme={"linkedin"}
    w={"full"}
    maxW={"md"}
    leftIcon={<SiLinkedin />}
    isLoading={isSubmitting}
    onClick={handleConnectLinkedinAccount}
  >
    <Center>
      <Text>Connect Linkedin Account</Text>
    </Center>
  </Button>
    <Flex minH={"80vh"} align={"center"} justify={"center"}>
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          borderWidth="2px"
          rounded="lg"
          shadow="2px 2px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          m="10px auto"
          as="form"
        >
          <Heading w="100%" textAlign={"center"} py={4} fontWeight="normal">
            Schedule Post
          </Heading>
          <SimpleGrid columns={1} spacing={6}>
            <FormControl as={GridItem} colSpan={[3, 2]} isRequired>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Post Type
              </FormLabel>
              <Select
                placeholder="Select post type"
                value={type}
                variant="outline"
                w={"auto"}
                onChange={(e) => {
                  setType(e.currentTarget.value);
                }}
              >
                <option value="image">Image</option>
                <option value="poll">Create a Poll</option>
                <option value="text">Text</option>
              </Select>
            </FormControl>

            {type === "poll" ? (
              <>
                <FormControl mt={2} as={GridItem} colSpan={[3, 2]} isRequired>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "white",
                    }}
                  >
                    Question
                  </FormLabel>
                  <Input
                    p={2}
                    placeholder="Hey guys I just started using Socialhub"
                    shadow="sm"
                    focusBorderColor="brand.400"
                    fontSize={{
                      sm: "sm",
                    }}
                    value={content}
                    onChange={(e) => {
                      setContent(e.currentTarget.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl mt={2} as={GridItem} colSpan={[3, 2]}>
                  <RadioGroup value={"1"} onChange={() => {}}>
                    <Stack direction="column">
                      {pollOptions.map((item) => (
                        <Radio
                          key={item.id}
                          value={item.value}
                          textTransform="capitalize"
                        >
                          {item.value}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                  <FormHelperText>
                    Brief description for your profile. URLs are hyperlinked.
                  </FormHelperText>
                </FormControl>
              </>
            ) : (
              <FormControl mt={2} as={GridItem} colSpan={[3, 2]} isRequired>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "white",
                  }}
                >
                  Content
                </FormLabel>
                <Textarea
                  p={2}
                  placeholder="Hey guys I just started using Socialhub"
                  rows={10}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: "sm",
                  }}
                  value={content}
                  onChange={(e) => {
                    setContent(e.currentTarget.value);
                  }}
                ></Textarea>

                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            )}

            <FormControl>
              <Stack spacing={10}>
                <Spacer />
                <Button
                  // bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.600",
                  }}
                  colorScheme={"linkedin"}
                  w={"full"}
                  maxW={"md"}
                  leftIcon={<SiLinkedin />}
                  isLoading={isSubmitting}
                  onClick={handleSubmitPost}
                >
                  <Center>
                    <Text>Send to Linkedin</Text>
                  </Center>
                </Button>

                <Input type={'datetime-local'} value={scheduledTime}
                onChange={(e)=>{
                  console.log(e.currentTarget.value); 
                  setScheduledTime(e.currentTarget.value)
                }}
                ></Input>

                <Select>
                  <option value={"15min"}  selected>15 min</option>
                  <option value={"30min"}>30 min</option>
                  <option value={"1hr"}>1 hour</option>
                  <option value={"Tomorrow"}>Tomorrow</option>
                </Select>
                <Button
                  _hover={{
                    bg: "blue.600",
                    color: "white",
                  }}
                  colorScheme={"linkedin"}
                  variant={"outline"}
                  // w={"full"}
                  // maxW={"md"}
                  leftIcon={<FaClock />}
                  isLoading={isSubmittingScheduled}
                  onClick={handleSubmitSchedulePost}
                >
                  <Center>
                    <Text>Schedule for Later</Text>
                  </Center>
                </Button>
              </Stack>
            </FormControl>
          </SimpleGrid>
        </Box>
      </Stack>
    </Flex>
    </>
  );
};

export default withAuthenticationRequired(LinkedinPostForm);
