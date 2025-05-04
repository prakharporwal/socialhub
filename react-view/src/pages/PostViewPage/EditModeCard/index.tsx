import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
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

type IEditModeCardProps = {
  postId: string;
  postData: any;
  setData: (data: any) => void;
  setIsEditing: (isEditing: boolean) => void;
};

export function EditModeCard(props: IEditModeCardProps) {
  const { postData, postId, setIsEditing, setData } = props;

  const { post_text } = postData;
  const [text, setText] = useState<string>(post_text);
  const toast = useToast();
  const navigate = useNavigate();

  function submitUpdate() {
    const body = {
        post_type: "TEXT",
        post_text: text,
        is_draft: true,
    }
    console.log(body);
    ApiCaller.put(`/p/v1/posts/${postId}`, body)
      .then(() => {
        setIsEditing(false);
        setData({post: {...postData, post_text: text }});
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
          <Card>
            <CardBody>
              <Input value={text} onInput={(e)=>{
                if(e.currentTarget){
                    console.log(e.currentTarget.value);
                    setText(e.currentTarget.value);
                }
              }}/>
              {/* <Box display={"flex"} flexDirection={"row"}>
                <Image
                  src={"/main_cover.jpeg"}
                  alt="post-img"
                  h={"sm"}
                  border={"2px"}
                  borderColor={"gray.200"}
                  my={4}
                ></Image>
                <AddAImageInput />
              </Box> */}
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
                  onClick={() => {
                    submitUpdate();
                  }}
                >
                  Save
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
