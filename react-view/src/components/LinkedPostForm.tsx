import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  FormHelperText,
  useToast,
  useColorModeValue,
  Stack,
  Spacer,
  Text,
  Center,
  RadioGroup,
  Radio,
  ButtonGroup,
  Switch,
} from "@chakra-ui/react";
import { SiLinkedin } from "react-icons/si";
import { useAuth } from "../hooks/useAuth";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import CONSTANTS from "../CONSTANTS";

const LinkedinPostForm: React.FunctionComponent<any> = () => {
  const toast = useToast();
  const auth = useAuth();
  const [type, setType] = useState<string>("text");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingScheduled, setIsSubmittingScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(
    new Date().toISOString().substring(0, 16)
  );

  const [pollOptions, setPollOptions] = useState([
    { value: "monday", id: 1 },
    { value: "tuesday", id: 2 },
  ]);

  useEffect(() => {
    console.log(scheduledTime);
  }, [scheduledTime]);

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
    // await fetch(CONSTANTS.api_server_url+"/app/linkedin/post", {
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

    await fetch(CONSTANTS.api_server_url + "/app/linkedin/post", {
      headers: {
        "access-token": auth.accessToken || "",
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
      .then(async (res) => {
        if (res.ok || res.status === 201) {
          return res.json();
        }

        let resp = {};
        await res.json().then((body) => {
          resp = body;
        });

        throw new Error(JSON.stringify(resp));
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
        console.log("error", JSON.parse(err?.message).error);
        if (!toast.isActive("post-submit-api-error")) {
          toast({
            id: "post-submit-api-error",
            status: "error",
            title: "Posting Failed",
            description: JSON.parse(err?.message).error,
          });
        }
      })
      .finally(() => {
        console.log(content, type);
        setIsSubmitting(false);
      });

    return;
  };

  function handleSubmitSchedulePost() {
    setIsSubmittingScheduled(true);

    fetch(CONSTANTS.api_server_url + "/app/linkedin/schedule/post", {
      method: "POST",
      headers: {
        "access-token": auth.accessToken || "",
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
        scheduled_at: scheduledTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmittingScheduled(false);
      });
  }

  return (
    <Box>
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        direction={"column"}
      >
        <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            borderWidth="2px"
            rounded="lg"
            shadow="2px 2px 3px rgba(0,0,0,0.3)"
            minWidth={{ sm: 80, md: 96 }}
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
                  {/* <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "white",
                    }}
                  >
                    Content
                  </FormLabel> */}
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

                  <FormHelperText> </FormHelperText>
                </FormControl>
              )}

              <FormControl>
                <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
                  <FormLabel htmlFor="isChecked">Twitter</FormLabel>
                  <Switch id="isChecked" isChecked marginRight={"auto"} />

                  <FormLabel htmlFor="isDisabled">Linkedin</FormLabel>
                  <Switch id="isDisabled" defaultChecked marginRight={"auto"} />

                  <FormLabel htmlFor="isFocusable">Instagram</FormLabel>
                  <Switch id="isFocusable" isFocusable marginRight={"auto"} />

                  <FormLabel htmlFor="isInvalid">Facebook</FormLabel>
                  <Switch id="isInvalid" isInvalid marginRight={"auto"} />
                </FormControl>
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
                  {/* <Input
                    type={"datetime-local"}
                    value={scheduledTime}
                    onChange={(e) => {
                      console.log(e.currentTarget.value);
                      setScheduledTime(e.currentTarget.value);
                    }}
                  ></Input>
                  <Select value={"15min"}>
                    <option value={"15min"}>15 min</option>
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
                  </Button> */}
                </Stack>
              </FormControl>
            </SimpleGrid>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

const Arr: React.FunctionComponent<any> = (props) => {
  return <div></div>;
};

export default withAuthenticationRequired(LinkedinPostForm);
