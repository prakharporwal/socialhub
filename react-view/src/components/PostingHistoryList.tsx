import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Switch } from "@chakra-ui/switch";
import { FormLabel } from "@chakra-ui/form-control";
import { SiLinkedin, SiTwitter } from "react-icons/si";
import { useAuth } from "../hooks/useAuth";
import CONSTANTS from "../CONSTANTS";
// {
//     "scheduled_post_id": "292341f2-bde1-4c39-9436-35be4a7e606e",
//     "account_id": 1234,
//     "author_urn": "urn:li:person:m55DJ0ZigA",
//     "post_id_on_linkedin": "lol",
//     "post_json_string": "{\"author\":\"\",\"commentary\":\"hey Guzs\",\"distribution\":{\"feedDistribution\":\"MAIN_FEED\",\"targetEntities\":[],\"thirdPartyDistributionChannels\":[]},\"isReshareDisabledByAuthor\":false,\"lifecycleState\":\"PUBLISHED\",\"visibility\":\"PUBLIC\"}",
//     "post_type": "text",
//     "scheduled_time": "2023-05-22T07:40:47.66038Z",
//     "status": "PUBLISHED",
//     "created_by": "prakharporwal99@gmail.com",
//     "created_at": "2023-05-22T07:30:47.660895Z",
//    "updated_at": "2023-05-22T07:41:33.060103Z"
// },

type LinkedinPost = {
  author?: string;
  author_urn?: string;
  distribution?: any;
  commentary?: string;
  visibility?: string;
  isReshareDisabledByAuthor?: boolean;
  lifecycleState?: string;
};

type Post = {
  scheduled_post_id: string;
  account_id?: number;
  post_json_string: LinkedinPost;
  post_type: string;
  status: string;
  created_by: string;
  created_at: string;
};

interface IProps {
  posts?: Post[];
}

const PostingHistoryList: React.FunctionComponent<IProps> = () => {
  const auth = useAuth();

  const [posts, setPosts] = useState<Post[]>([
    {
      scheduled_post_id: "hello",
      post_json_string: {
        commentary: "hello",
      },
      post_type: "text",
      status: "PUBLISHED",
      created_by: "prakhar@gmail.com",
      created_at: "25th May 2023",
    },
    {
      scheduled_post_id: "hello",
      post_json_string: {
        commentary: "hello",
      },
      post_type: "text",
      status: "PUBLISHED",
      created_by: "prakhar@gmail.com",
      created_at: "25th May 2023",
    },
    {
      scheduled_post_id: "hello",
      post_json_string: {
        commentary: "hello",
      },
      post_type: "text",
      status: "PUBLISHED",
      created_by: "prakhar@gmail.com",
      created_at: "25th May 2023",
    },
    {
      scheduled_post_id: "hello",
      post_json_string: {
        author: "a",
        commentary: "hey Guzs",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        isReshareDisabledByAuthor: false,
        lifecycleState: "PUBLISHED",
        visibility: "PUBLIC",
      },
      status: "PUBLISHED",
      post_type: "text",
      created_by: "prakhar@gmail.com",
      created_at: "25th May 2023",
    },
    {
      scheduled_post_id: "hello",
      post_json_string: {},
      post_type: "text",
      status: "PUBLISHED",
      created_by: "prakhar@gmail.com",
      created_at: "25th May 2023",
    },
  ]);

  useEffect(() => {
    fetch(CONSTANTS.api_server_url + "/app/linkedin/posts/fetchall", {
      method: "GET",
      headers: {
        "access-token": auth.accessToken || "",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.status);
        console.log(res.body);
        throw new Error("failed fetching posts!");
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
        return;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [auth]);

  return (
    <Box h={"calc(100vh - 4rem)"} overflowY={"auto"}>
      <Box w="100%" p={4} color="white" as={"div"}>
        <Heading color={"black"}>Your Posts</Heading>
        <List>
          {posts &&
            posts.map((item, idx) => {
              return <PostHistory key={item.scheduled_post_id} post={item} />;
            })}
        </List>
      </Box>
    </Box>
  );
};

interface IPHprops {
  post: Post;
}

const PostHistory: React.FunctionComponent<IPHprops> = ({ post }) => {
  return (
    <Card p="4" m="4" w="70%">
      <CardHeader>
        <Heading size="sm"></Heading>
      </CardHeader>
      <CardBody>
        <Box
          bg={"whitesmoke"}
          p="4"
          border={"1px solid grey"}
          borderRadius={"4px"}
        >
          {post.post_json_string?.commentary}
        </Box>
      </CardBody>
      <CardFooter display={"flex"} flexDirection={"column"}>
        <Text>{post.scheduled_post_id}</Text>
        <Text>{post.created_by}</Text>
        <Text>{post.status}</Text>
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
              <Text>{post.post_json_string.commentary}</Text>
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

export default withAuthenticationRequired(PostingHistoryList);
