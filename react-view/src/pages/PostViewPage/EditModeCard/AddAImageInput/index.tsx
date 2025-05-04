import { Box, Text } from "@chakra-ui/react";

export default function AddAImageInput() {
    return (
        <Box>
            <Text fontSize={"lg"}>Add an image</Text>
            <Box
                border={"2px"}
                borderColor={"gray.200"}
                h={"40"}
                w={"40"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"lg"}
            >
                <Text>Drag and drop your image here</Text>
            </Box>
            <Text fontSize={"sm"} color={"gray.500"}>
                Supported formats: JPEG, PNG, GIF, MP4, WEBM
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
                Max file size: 10MB
                </Text>
        </Box>
    )
}