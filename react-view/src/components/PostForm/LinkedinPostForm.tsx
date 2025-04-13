import React, { ChangeEvent, useState } from "react";
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
  Spacer,
  Text,
  Center,
  RadioGroup,
  Radio,
  Switch,
  IconButton,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import withAuthenticationRequired from "../../hoc/withAuthenticationRequired";
import CONSTANTS from "../../EnvConstant";
import { FaClock } from "react-icons/fa";
import ApiCaller from "src/utils/APIUtils";
import {
  CreatePost,
  SocialMediaPlatform,
} from "src/apimodels/postsdetails/post";

const PostForm: React.FunctionComponent<any> = () => {
  const toast = useToast();
  const auth = useAuth();
  const [type, setType] = useState<string>("text");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [platforms, setPlatforms] = useState(new Map());

  const [isSubmittingScheduled, setIsSubmittingScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(
    convertToLocalTimeString(new Date())
  );

  const [showScheduleSection, setShowScheduleSection] = useState(true);

  const [pollOptions, setPollOptions] = useState([
    { value: "monday", id: 1 },
    { value: "tuesday", id: 2 },
  ]);

  const handlePlatformListChange = (e: ChangeEvent<HTMLInputElement>) => {
    platforms.set(e.currentTarget.id, e.currentTarget.checked);
    setPlatforms(new Map(platforms));
  };

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    const X = Array.from(platforms, ([name, value]) => {
      if (value) {
        console.log(name);
        return name;
      }
    }) as Array<SocialMediaPlatform>;

    const body: CreatePost = {
      post_text: content,
      post_type: "TEXT",
      creation_status: "COMPLETED",
      platforms: X,
    };

    ApiCaller.post("/p/v1/posts", body)
      .then(() => {
        if (!toast.isActive("post-submit-success")) {
          toast({
            id: "post-submit-success",
            status: "success",
            title: "Post submitted successfully",
          });
        }
      })
      .catch((err) => {
        if (!toast.isActive("post-submit-error")) {  
              toast({  
                 id: "post-submit-error",  
                  status: "error",  
                  title: "Failed to submit post",  
                  description: err.response?.data?.message || "An unexpected error occurred",  
                });  
              }  
              console.error("Post submission error:", err);  
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
        align={"center"}
        justify={"center"}
        direction={"column"}
      >
        <Flex gap={4} mx={"auto"} width={"full"} py={4} px={4}>
          <Box
            borderWidth="2px"
            rounded="lg"
            shadow="2px 2px 3px rgba(0,0,0,0.3)"
            minWidth={{ base: "full", sm: "50%" }}
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            m="4"
          >
            <SimpleGrid columns={1} spacing={6}>
              <form onSubmit={handleSubmitPost}>
                <FormControl as={GridItem} colSpan={[3, 2]} isRequired>
                  <FormLabel
                    htmlFor="post_type"
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
                    id="post_type"
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
                        <Flex direction="column">
                          {pollOptions.map((item) => (
                            <Radio
                              key={item.id}
                              value={item.value}
                              textTransform="capitalize"
                            >
                              {item.value}
                            </Radio>
                          ))}
                        </Flex>
                      </RadioGroup>
                      <FormHelperText>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </FormHelperText>
                    </FormControl>
                  </>
                ) : (
                  <FormControl mt={2} as={GridItem} colSpan={[3, 2]} isRequired>
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
                  <FormLabel htmlFor="TWITTER">Twitter</FormLabel>
                  <Switch
                    id="TWITTER"
                    marginRight={"auto"}
                    isChecked={platforms.get("TWITTER")}
                    onChange={handlePlatformListChange}
                  />

                  <FormLabel htmlFor="LINKEDIN">Linkedin</FormLabel>
                  <Switch
                    id="LINKEDIN"
                    marginRight={"auto"}
                    isChecked={platforms.get("LINKEDIN")}
                    onChange={handlePlatformListChange}
                  />
                  <FormLabel htmlFor="INSTAGRAM">Instagram</FormLabel>
                  <Switch
                    id="INSTAGRAM"
                    marginRight={"auto"}
                    isChecked={platforms.get("INSTAGRAM")}
                    onChange={handlePlatformListChange}
                  />
                  <FormLabel htmlFor="FACEBOOK">Facebook</FormLabel>
                  <Switch
                    id="FACEBOOK"
                    marginRight={"auto"}
                    isChecked={platforms.get("FACEBOOK")}
                    onChange={handlePlatformListChange}
                  />
                </FormControl>
                <FormControl>
                  <Flex gap={8}>
                    <Spacer />
                    {showScheduleSection ? (
                      <Flex dir="row" gap={4}>
                        <Button
                          type="submit"
                          colorScheme={"blue"}
                          w={"full"}
                          maxW={"md"}
                          isLoading={isSubmitting}
                          onClick={() => {}}
                        >
                          <Center>
                            <Text>{"Post"}</Text>
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
                      <Flex gap={8}>
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
                          colorScheme="blue"
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
                      </Flex>
                    )}
                  </Flex>
                </FormControl>
              </form>
            </SimpleGrid>
          </Box>
        </Flex>
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

export default withAuthenticationRequired(PostForm);
