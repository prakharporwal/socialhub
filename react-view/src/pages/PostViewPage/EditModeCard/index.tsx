import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApiCaller from "src/utils/APIUtils";
import AddAImageInput from "./AddAImageInput";
import { Post } from "src/apimodels/postsdetails/post";

type IEditModeCardProps = {
  postId: string;
  postData: Post;
  setData: (data: any) => void;
  setIsEditing: (isEditing: boolean) => void;
};

export function EditModeCard(props: IEditModeCardProps) {
  const { postData, postId, setIsEditing, setData } = props;

  const { post_text } = postData;
  const [text, setText] = useState<string>(post_text);
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function submitUpdate(complete: boolean = false) {
    const body = {
      post_type: "TEXT",
      post_text: text,
      is_draft: !complete,
    };
    setIsSubmitting(true);

    ApiCaller.put(`/p/v1/posts/${postId}`, body)
      .then(() => {
        setIsEditing(false);
        setData({ post: { ...postData, post_text: text } });
        toast({
          status: "success",
          title: complete ? "Post Published" : "Draft Saved",
          description: complete
            ? "Your post has been published successfully"
            : "Your draft has been saved",
          duration: 3000,
        });
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message || "An error occurred";
        toast({
          status: "error",
          title: "Update Failed",
          description: errorMessage,
          duration: 3000,
        });
        // Only navigate away if the post doesn't exist
        if (err?.response?.status === 404) {
          navigate("/app/home");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (!postData) {
    return <></>;
  }
  return (
    <Modal size={"3xl"} isOpen={true} onClose={() => setIsEditing(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Edit Post
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Card h={'xl'}>
            <CardBody>
            <FormLabel>Text</FormLabel>
              <Input
                value={text}
                onInput={(e) => {
                  if (e.currentTarget) {
                    console.log(e.currentTarget.value);
                    setText(e.currentTarget.value);
                  }
                }}
              />
                <AddAImageInput />
            </CardBody>
            <CardFooter
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-end"}
            >
              <ButtonGroup>
                <Button
                  variant={"ghost"}
                  colorScheme={"blue"}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onClick={() => {
                    submitUpdate(false);
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  variant={"solid"}
                  colorScheme={"blue"}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onClick={() => {
                    submitUpdate(true);
                  }}
                >
                  Submit To Post
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
