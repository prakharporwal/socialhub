import { Box, Image, Input, Text, useToast } from "@chakra-ui/react";
import { DragEventHandler, useRef, useState } from "react";

interface IAddAImageInputProps {
  onImageSelect?: (file: File) => void;
}

//TODO: This component is WIP and needs to be completed
export default function AddAImageInput({
  onImageSelect,
}: IAddAImageInputProps): JSX.Element {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleDragOver: React.DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: any) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPEG, PNG, GIF, MP4, or WEBM files only",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        status: "error",
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const handleDrop: DragEventHandler<HTMLDivElement> | undefined = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file: File = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onImageSelect && onImageSelect(file);
    }
  };

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onImageSelect && onImageSelect(file);
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <Box>
      <Text fontSize={"lg"}>Add an image</Text>
      <Box
        border={"2px"}
        borderColor={isDragging ? "blue.300" : "gray.200"}
        bg={isDragging ? "blue.50" : "transparent"}
        h={"40"}
        w={"40"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"lg"}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBoxClick}
        cursor="pointer"
        position="relative"
      >
        <Input
          type="file"
          accept="image/jpeg,image/png,image/gif,video/mp4,video/webm"
          display="none"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        {selectedFile ? (
          <Box>
            {/* render the image in a image tag for preview */}
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              boxSize="full"
              objectFit="cover"
              borderRadius="lg"
            />
            <Text fontSize="sm" mb={2}>
              Selected file:
            </Text>
            <Text fontWeight="bold">{selectedFile.name}</Text>
          </Box>
        ) : (
          <Text>Drag and drop your image here</Text>
        )}
      </Box>
      <Text fontSize={"sm"} color={"gray.500"}>
        Supported formats: JPEG, PNG, GIF, MP4, WEBM
      </Text>
      <Text fontSize={"sm"} color={"gray.500"}>
        Max file size: 10MB
      </Text>
    </Box>
  );
}
