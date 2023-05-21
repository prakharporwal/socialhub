import React, { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  useToast,
  useColorModeValue,
  Checkbox,
  Stack,
  Link,
  Spacer,
  Text,
  Center,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";

const  LinkedinPostForm: React.FunctionComponent<any> = ()=> {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        bg={useColorModeValue("white", "gray.900")}
        p={6}
        m="10px auto"
        as="form"
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal">
          Social Post
        </Heading>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Type
            </FormLabel>
            <InputGroup size="sm">
              {/* <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: "gray.800",
                }}
                color="gray.500"
                rounded="md"
              >
                Type
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="www.example.com"
                focusBorderColor="brand.400"
                rounded="md"
              /> */}
              <Select placeholder="Select Post Type">
                <option value="image">Image</option>
                <option value="text">Text</option>
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl id="email" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              About
            </FormLabel>
            <Textarea
              placeholder="you@example.com"
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
              onChange={(e)=>{
                setContent(e.currentTarget.value)
              }}
            />
            {/* <FormHelperText>
              Brief description for your profile. URLs are hyperlinked.
            </FormHelperText> */}
            <Stack spacing={10}>
              <Spacer />
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                colorScheme={"linkedin"}
                w={"full"}
                maxW={"md"}
                leftIcon={<SiLinkedin />}
                onClick={()=>{
                    console.log()
                }}
              >
                <Center>
                  <Text>Send to Linkedin</Text>
                </Center>
              </Button>
            </Stack>
          </FormControl>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default LinkedinPostForm;