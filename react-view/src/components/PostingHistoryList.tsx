import React, { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, ListItem, Text } from "@chakra-ui/layout";
import withAuthenticationRequired from "../hoc/withAuthenticationRequired";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Switch } from "@chakra-ui/switch";
import { FormLabel } from "@chakra-ui/form-control";
import { SiLinkedin, SiTwitter } from "react-icons/si";
import { useAuth } from "../hooks/useAuth";
import CONSTANTS from "../CONSTANTS";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import mockData from "./mockPosts.json";
import LoadingShell from "./ui/LoadingShell";
import { useNavigate } from "react-router";

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
  post_json_string: string;
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
  const navigate = useNavigate();
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(mockData);

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
      ) : (
        <TableContainer w={"100%"} px={4}>
          <Table variant="striped" colorScheme={"gray"}>
            <Thead>
              <Th>Post Type</Th>
              <Th>Post</Th>
              <Th>Status</Th>
              <Th>Platform</Th>
              <Th>Created By</Th>
              <Th>Created At</Th>
            </Thead>
            <Tbody fontSize={"sm"}>
              {posts.map((item, idx) => (
                <Tr
                  key={item.scheduled_post_id}
                  onClick={() => {
                    navigate("/app/post/" + item.scheduled_post_id);
                  }}
                >
                  <Td>{item.post_type}</Td>
                  <Td
                    maxWidth={"64"}
                    wordBreak={"break-word"}
                    whiteSpace={"pre-wrap"}
                    overflowX={"hidden"}
                  >
                    {JSON.parse(item.post_json_string).commentary}
                  </Td>
                  <Td>{item.status}</Td>
                  <Td>{""}</Td>
                  <Td>{item.created_by}</Td>
                  <Td>{item.created_at}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot
              fontSize={"xs"}
              fontWeight={"bold"}
              backgroundColor={"InfoBackground"}
            >
              <Tr>
                <Td colSpan={6}>1 2 3 4</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
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

export default withAuthenticationRequired(PostingHistoryList);
