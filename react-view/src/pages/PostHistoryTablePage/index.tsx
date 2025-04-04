import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import withAuthenticationRequired from "../../hoc/withAuthenticationRequired";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Switch } from "@chakra-ui/switch";
import { FormLabel } from "@chakra-ui/form-control";
import { SiLinkedin, SiTwitter } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import CONSTANTS from "../../EnvConstant";
import { useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import mockPosts from "src/components/mockPosts.json";
import LoadingShell from "src/components/ui/LoadingShell";
import PostsTable from "./PostsTable";
import { Post } from "src/apimodels/postsdetails/post";

type LinkedinPost = {
  author?: string;
  author_urn?: string;
  distribution?: any;
  commentary?: string;
  visibility?: string;
  isReshareDisabledByAuthor?: boolean;
  lifecycleState?: string;
};

interface IProps {
  posts?: Post[];
}

const PostingHistoryTablePage: React.FunctionComponent<IProps> = () => {
  const auth = useAuth();
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    setIsLoadingPosts(true);
    fetch(CONSTANTS.api_server_url + "/api/p/linkedin/posts/fetchall", {
      method: "GET",
      headers: {
        "access-token": auth.accessToken || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("failed fetching posts!");
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }, []);

  return (
    <Box w="100%" px={4} as={"div"}>
      <Heading color={"black"}>Your Posts</Heading>
      {isLoadingPosts ? (
        <LoadingShell />
      ) : posts.length === 0 ? (
        <Flex
          justifyContent={"center"}
          direction={"column"}
          alignItems={"center"}
          h={"80vh"}
          w={"80vw"}
          gap={8}
        >
          <Text fontSize={'lg'}>No posts</Text>
          <Button
            variant={"solid"}
            colorScheme="blue"
            as={RouterLink}
            to="/app/post/new"
          >
            + Create New Post
          </Button>
        </Flex>
      ) : (
        <PostsTable posts={posts} />
      )}
    </Box>
  );
};

interface IPHprops {
  post: Post;
}

const PostHistory: React.FunctionComponent<IPHprops> = ({ post }) => {
  useEffect(() => {
    console.log(post);
  }, []);
  return (
    <Card p="4" my="4" w="100%" maxW="md">
      <CardHeader>
        <Heading size="sm"></Heading>
      </CardHeader>
      <CardBody>
        <Box
          bg={useColorModeValue("whitesmoke", "grey")}
          p="4"
          border={"1px solid grey"}
          borderRadius={"4px"}
        >
          {JSON.parse(post.post_json_string)?.commentary}
        </Box>
      </CardBody>
      <CardFooter display={"flex"} flexDirection={"column"}>
        <Text>{post.scheduled_post_id}</Text>
        <Text>{post.created_by}</Text>
        <Text>{post.status}</Text>
        <Text>
          {new Date(post.created_at).toLocaleDateString() +
            "  " +
            new Date(post.created_at).toLocaleTimeString()}
        </Text>
      </CardFooter>
    </Card>
  );
};

const _PostHistory: React.FunctionComponent<IPHprops> = ({ post }) => {
  return (
    <ListItem w="60%">
      <Card padding={8} margin={4}>
        <Heading size="xs" textTransform="uppercase">
          <Text>{post.scheduled_post_id}</Text>
        </Heading>
        <Flex direction={"column"}>
          <CardBody>
            <Heading size={"sm"}>Content</Heading>
            <Card p={4} bg={"lightgray"}>
              <Text>{JSON.parse(post.post_json_string)?.commentary}</Text>
            </Card>
            <Text as="b" display={"block"}>
              {"post on: " + post.created_at}
            </Text>
            <Text as="i">{"posted by: " + post.created_by}</Text>
            <Text as="i">{"status: " + post.status}</Text>
          </CardBody>
        </Flex>
        <Divider />
        <CardFooter>
          <ButtonGroup>
            <Button colorScheme={"linkedin"}>Reschedule</Button>
            <Button variant="outline">Delete</Button>
          </ButtonGroup>
        </CardFooter>
        <ButtonGroup gap="8">
          <FormLabel htmlFor="email-alerts" mb="0">
            <SiLinkedin /> Linkedin
          </FormLabel>
          <Switch id="linkedin" />
          <FormLabel htmlFor="email-alerts" mb="0">
            <SiTwitter /> Twitter
          </FormLabel>
          <Switch id="twitter" />
        </ButtonGroup>
      </Card>
    </ListItem>
  );
};

export default withAuthenticationRequired(PostingHistoryTablePage);
