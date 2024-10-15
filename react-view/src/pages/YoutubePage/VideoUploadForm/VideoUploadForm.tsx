import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Progress,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

const VideoUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Optional: Validate file type and size
      if (!selectedFile.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setFile(selectedFile);
      setUploaded(false);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Step 1: Get pre-signed URL from backend
    fetch("http://localhost:8080/api/upload", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: "",
    })
      .then((res) => res.json())
      .then((body) => {
        const { uploadURL } = body;

        // Step 2: Upload the file directly to S3 using the pre-signed URL

        setUploaded(true);
        toast({
          title: "Upload successful",
          description: "Your video has been uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        toast({
          title: "Upload failed",
          description: "There was an error uploading your video.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Select Video</FormLabel>
          <Input type="file" accept="video/*" onChange={handleFileChange} />
        </FormControl>

        {file && (
          <Box w="100%">
            <Text fontSize="md">Selected File: {file.name}</Text>
          </Box>
        )}

        {uploading && (
          <Progress
            value={progress}
            size="sm"
            width="100%"
            colorScheme="blue"
          />
        )}

        <Button
          colorScheme="teal"
          onClick={handleUpload}
          isDisabled={!file || uploading}
          isLoading={uploading}
          loadingText="Uploading"
        >
          Upload
        </Button>

        {uploaded && (
          <Text color="green.500" fontSize="md">
            Upload completed!
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default VideoUploadForm;
