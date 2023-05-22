import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";

type Post = {
  postId: string;
  postJsonString: string;
};

interface IProps {
  posts?: Post[];
}

const PostingHistoryList: React.FunctionComponent<IProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
      <Box>
        {posts.map((item, idx) => {
          return <PostHistory key={item.postId} post={item} />;
        })}
      </Box>
    </Flex>
  );
};

interface IPHprops {
  post: Post;
}

const PostHistory: React.FunctionComponent<IPHprops> = ({ post }) => {
  return (
    <Box>
      <Text>{post.postId}</Text>
      <Text>{post.postJsonString}</Text>
    </Box>
  );
};

export default withAuthenticationRequired(PostingHistoryList);
