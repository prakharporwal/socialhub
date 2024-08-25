import React, { useState } from "react";
import {
  Box,
  Button,
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
  Switch,
  IconButton,
} from "@chakra-ui/react";
import { SiPeertube } from "react-icons/si";
import { useAuth } from "../hooks/useAuth";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import CONSTANTS from "../CONSTANTS";
import { FaClock } from "react-icons/fa";

const LinkedinPostForm: React.FunctionComponent<any> = () => {
  const toast = useToast();
  const auth = useAuth();
  const [type, setType] = useState<string>("text");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTwitterPost, setIsTwitterPost] = useState(false);
  const [isLinkedinPost, setIsLinkedinPost] = useState(false);
  const [isSubmittingScheduled, setIsSubmittingScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(
    convertToLocalTimeString(new Date())
  );

  const [showScheduleSection, setShowScheduleSection] = useState(true);

  const [pollOptions, setPollOptions] = useState([
    { value: "monday", id: 1 },
    { value: "tuesday", id: 2 },
  ]);

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
    if (isLinkedinPost) {
      await fetch(CONSTANTS.api_server_url + "/api/p/linkedin/post", {
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
              title: "Posting Failed for Linkedin",
              description: JSON.parse(err?.message).error,
            });
          }
        })
        .finally(() => {
          console.log(content, type);
          setIsSubmitting(false);
        });
    }

    // POST ON TWITTER API ALSO
    if (isTwitterPost) {
      await fetch(CONSTANTS.api_server_url + "/api/p/twitter/tweets/create", {
        headers: {
          "access-token": auth.accessToken || "",
        },
        method: "POST",
        body: JSON.stringify({ text: content }),
      })
        .then(async (res) => {
          const body = res.json();
          if (res.ok || res.status === 201) {
            return body;
          }

          throw new Error(JSON.stringify({ body }));
        })
        .then((data) => {
          if (!toast.isActive("post-submit-api-success")) {
            toast({
              id: "twitter-submit-api-success",
              status: "success",
              title: "Submitted Post to Twitter",
              description: "Posting now depends on twitter",
            });
          }
        })
        .catch((err) => {
          console.log("error", JSON.parse(err?.message).error);
          if (!toast.isActive("post-submit-api-error")) {
            toast({
              id: "twitter-submit-api-error",
              status: "error",
              title: "Posting Failed For Twitter!",
              description: JSON.parse(err?.message).error,
            });
          }
        })
        .finally(() => {
          console.log(content, type);
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }

    return;
  };

  function handleSubmitSchedulePost() {
    let df = new Date(scheduledTime);
    let dfIsoString = new Date(
      df.getTime() + df.getTimezoneOffset() * 60000
    ).toISOString();

    console.log(dfIsoString);

    if (content === "") {
      if (!toast.isActive("post-empty")) {
        toast({
          id: "post-empty",
          status: "error",
          title: "Post content is empty!",
        });
      }
      return;
    }

    setIsSubmittingScheduled(true);

    fetch(CONSTANTS.api_server_url + "/api/p/linkedin/schedule/post", {
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
        scheduled_at: dfIsoString,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error scheduling post!");
      })
      .then((data) => {
        console.log(data);

        toast({
          status: "success",
          title: "Submitted post for scheduling",
          duration: 5000,
        });
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
        <Stack spacing={4} mx={"auto"} width={"full"} py={4} px={4}>
          <Box
            borderWidth="2px"
            rounded="lg"
            shadow="2px 2px 3px rgba(0,0,0,0.3)"
            minWidth={{ base: "full", sm: "96" }}
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            m="10px auto"
            as="form"
          >
            <SimpleGrid columns={1} spacing={6}>
              <form>
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
                    <option value="image" disabled aria-disabled>
                      Image
                    </option>
                    <option value="poll" disabled aria-disabled>
                      Create a Poll
                    </option>
                    <option value="text">Text</option>
                  </Select>
                </FormControl>
                {type === "poll" ? (
                  <>
                    <FormControl
                      mt={2}
                      as={GridItem}
                      colSpan={[3, 2]}
                      isRequired
                    >
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
                        Brief description for your profile. URLs are
                        hyperlinked.
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
                <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
                  <FormLabel htmlFor="isChecked">Twitter</FormLabel>
                  <Switch
                    id="isChecked"
                    marginRight={"auto"}
                    onChange={(e) => {
                      console.log(e.currentTarget.checked);
                      setIsTwitterPost(e.currentTarget.checked);
                    }}
                  />

                  <FormLabel htmlFor="isDisabled">Linkedin</FormLabel>
                  <Switch
                    id="isDisabled"
                    marginRight={"auto"}
                    onChange={(e) => {
                      console.log(e.currentTarget.checked);
                      setIsLinkedinPost(e.currentTarget.checked);
                    }}
                  />
                  <FormLabel htmlFor="isFocusable">Instagram</FormLabel>
                  <Switch id="isFocusable" marginRight={"auto"} isDisabled />
                  <FormLabel htmlFor="isInvalid">Facebook</FormLabel>
                  <Switch id="isInvalid" marginRight={"auto"} isDisabled />
                </FormControl>
                <FormControl>
                  <Stack spacing={8}>
                    <Spacer />
                    {showScheduleSection ? (
                      <Flex dir="row" gap={4}>
                        <Button
                          // bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.600",
                          }}
                          colorScheme={"linkedin"}
                          w={"full"}
                          maxW={"md"}
                          leftIcon={<SiPeertube />}
                          isLoading={isSubmitting}
                          onClick={handleSubmitPost}
                        >
                          <Center>
                            <Text>{"Post on Socials"}</Text>
                          </Center>
                        </Button>
                        <IconButton
                          icon={<FaClock />}
                          aria-label="schedule post"
                          onClick={() => {
                            setShowScheduleSection(!showScheduleSection);
                          }}
                        />
                      </Flex>
                    ) : (
                      // <Select value={"15min"}>
                      //   <option value={"15min"}>15 min</option>
                      //   <option value={"30min"}>30 min</option>
                      //   <option value={"1hr"}>1 hour</option>
                      //   <option value={"Tomorrow"}>Tomorrow</option>
                      // </Select>
                      <Stack spacing={8}>
                        <Flex dir="row" gap={4}>
                          <Button
                            _hover={{
                              bg: "blue.600",
                              color: "white",
                            }}
                            colorScheme={"linkedin"}
                            variant={"outline"}
                            w={"full"}
                            maxW={"md"}
                            leftIcon={<FaClock />}
                            isLoading={isSubmittingScheduled}
                            onClick={handleSubmitSchedulePost}
                          >
                            <Center>
                              <Text>Schedule Post</Text>
                            </Center>
                          </Button>
                          <IconButton
                            icon={<FaClock />}
                            aria-label="schedule post"
                            onClick={() => {
                              setShowScheduleSection(!showScheduleSection);
                            }}
                          />
                        </Flex>
                        <Input
                          type={"datetime-local"}
                          value={scheduledTime.substring(0, 16)}
                          onChange={(e) => {
                            console.log(new Date(e.currentTarget.value));
                            const d = new Date(e.currentTarget.value);
                            const dateTimeLocalValueDisplay =
                              convertToLocalTimeString(d);
                            setScheduledTime(dateTimeLocalValueDisplay);
                          }}
                        ></Input>
                      </Stack>
                    )}
                  </Stack>
                </FormControl>
              </form>
            </SimpleGrid>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

function convertToLocalTimeString(date: Date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

const Arr: React.FunctionComponent<any> = (props) => {
  return <div></div>;
};

export default withAuthenticationRequired(LinkedinPostForm);
