import React, { useEffect, useState } from "react";
import {
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Textarea } from "@chakra-ui/textarea";
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
//     "updated_at": "2023-05-22T07:41:33.060103Z"
// },
type Post = {
  scheduled_post_id: string;
  account_id?: number;
  post_json_string: string;
  post_type: string;
  created_by: string;
  created_at: string;
};

interface IProps {
  posts?: Post[];
}

const PostingHistoryList: React.FunctionComponent<IProps> = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      scheduled_post_id: "hello",
      post_json_string: `{postId,}`,
      post_type:"text",
      created_by: "prakhar@gmail.com",
      created_at: "25th May 2023",
    },
  ]);

  useEffect(() => {
    fetch("https://api.yogveda.live" + "/app/linkedin/posts/fetchall", {
      method: "GET",
      headers: {
        "access-token": window.localStorage.getItem("access_token") || "",
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
        console.log(data)
        setPosts(data);
        return;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <Flex height={"80vh"} align={"center"} justify={"center"}>
      <List overflowY={'auto'}>
        {posts.map((item, idx) => {
          return <PostHistory key={item.scheduled_post_id} post={item} />;
        })}
      </List>
    </Flex>
  );
};

interface IPHprops {
  post: Post;
}

const PostHistory: React.FunctionComponent<IPHprops> = ({ post }) => {
  return (
    <ListItem>
      <Card padding={8} margin={4}>
        <Heading size="xs" textTransform="uppercase">   
          <Text>{post.scheduled_post_id}</Text>
        </Heading>
        <CardBody>
          Content
          <Textarea contentEditable={"false"}>{post.post_json_string}</Textarea>
          <Text as='b' display={'block'}>{"post on: " + post.created_at}</Text>
          <Text as='i'>{"posted by: " + post.created_by}</Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
            <Button colorScheme={"linkedin"}>Reschedule</Button>
            <Button variant="outline">Delete</Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </ListItem>
  );
};

export default withAuthenticationRequired(PostingHistoryList);
