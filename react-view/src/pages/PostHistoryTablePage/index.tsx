import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import withAuthenticationRequired from "../../hoc/withAuthenticationRequired";
import { Button } from "@chakra-ui/button";

import { Link as RouterLink, useLocation } from "react-router-dom";
import LoadingShell from "src/components/ui/LoadingShell";
import PostsTable from "./PostsTable";
import { Post } from "src/apimodels/postsdetails/post";
import ApiCaller from "src/utils/APIUtils";

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
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pageUrlParam = params.get("page") ? "?page=" + params.get("page") : "" ;

  useEffect(() => {
    setIsLoadingPosts(true);
    ApiCaller.get("/p/v1/posts" + pageUrlParam)
      .then((body: any) => {
        const posts: Post[] = body.response as Post[];
        setPosts(posts);
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
          <Text fontSize={"lg"}>No posts</Text>
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
        <PostsTable posts={posts}/>
      )}
    </Box>
  );
};

export default withAuthenticationRequired(PostingHistoryTablePage);
