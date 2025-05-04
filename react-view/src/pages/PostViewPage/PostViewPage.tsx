import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ApiCaller from "src/utils/APIUtils";
import { EditModeCard } from "./EditModeCard";
const AlertPopUp = lazy(() => import("src/components/AlertPopUp"));

export function PostViewPage() {
  const { postId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    ApiCaller.get(`/p/v1/posts/${postId}`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        toast({
          status: "error",
          title: "Post Not Found",
          description: "The post you are looking for does not exist",
        });
        navigate("/app/home");
      });
  }, [postId]);

  if (!data || !postId) {
    return <></>;
  }
  const { post_text, post_id, creation_status } = data.post;

  return (
    <Box>
      <Card
        w={{ base: "90vw", md: "xl" }}
        height={{ base: "80vh" }}
        m={2}
        p={4}
      >
        <CardBody>
          <Text>{post_text}</Text>
          {/* <Box>
            <Image
              src={"/main_cover.jpeg"}
              alt="post-img"
              h={"md"}
              border={"2px"}
              borderColor={"gray.200"}
              my={4}
            ></Image>
          </Box> */}
        </CardBody>
        <CardFooter
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <ButtonGroup>
            {creation_status === "DRAFT" && (
              <Button
                variant={"solid"}
                colorScheme="blue"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit Post
              </Button>
            )}
            <Button
              variant={"ghost"}
              colorScheme={"red"}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      {/* Edit Mode */}
      {isEditing && (
        <EditModeCard
          postId={postId}
          setIsEditing={setIsEditing}
          setData={setData}
          postData={data.post}
        />
      )}
      {/* Alerts popup */}
      {isOpen && (
        <AlertPopUp
          variant={"warning"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Delete Post"}
          description={"Are you sure? You can't undo this action afterwards."}
          successButtonAction={() => {
            ApiCaller.delete(`/p/v1/posts/${postId}`).then((res) => {
              toast({
                status: "warning",
                title: "Post Deleted",
                description: "The post has been deleted successfully",
                duration: 2000,
                isClosable: true,
              });
            });
            setData(null);
            navigate("/app/home");
            setIsOpen(false);
          }}
          cancelButtonText={"Cancel"}
          successBtnText={"Delete"}
        />
      )}
    </Box>
  );
}
