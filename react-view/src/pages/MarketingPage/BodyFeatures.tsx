import { Box, Container, Flex, Heading, Icon, Image, SimpleGrid, Stack, StackDivider, Text, useColorModeValue } from "@chakra-ui/react";
import { Feature } from "./MarketingPage";
import { IoLogoBitcoin, IoMdAnalytics, IoMdSearch } from "react-icons/io";

export function BodyFeatures(){
    return <Container maxW={"5xl"} py={12} h="120vh">
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Stack spacing={4} textAlign={"center"}>
        <Text
          textTransform={"uppercase"}
          color={"blue.400"}
          fontWeight={600}
          fontSize={"sm"}
          bg={useColorModeValue("blue.50", "blue.900")}
          p={2}
          alignSelf={"flex-start"}
          rounded={"md"}
        >
          Our Story
        </Text>
        <Heading>A Social Media Management Tool</Heading>
        <Text color={"gray.500"} fontSize={"lg"}>
          Manage all the social media accounts from one place
        </Text>
        <Box textAlign={"center"} color={"gray.500"}>
          <Text noOfLines={2}>
            Create, discuss and schedule posts for the best engagement
          </Text>
          <Text noOfLines={2}>
            Delegate and add people who can take care of your social media
            game.
          </Text>
        </Box>
        <Stack
          spacing={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.100", "gray.700")}
            />
          }
        >
          <Feature
            icon={
              <Icon as={IoMdAnalytics} color={"yellow.500"} w={5} h={5} />
            }
            iconBg={useColorModeValue("yellow.100", "yellow.900")}
            text={"Post Planning"}
          />
          <Feature
            icon={
              <Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />
            }
            iconBg={useColorModeValue("green.100", "green.900")}
            text={"Engagment Planning"}
          />
          <Feature
            icon={<Icon as={IoMdSearch} color={"purple.500"} w={5} h={5} />}
            iconBg={useColorModeValue("purple.100", "purple.900")}
            text={"Discussion and Approvals"}
          />
        </Stack>
      </Stack>
      <Flex>
        <Image
          rounded={"md"}
          alt={"feature image"}
          src={"images/marketing_img.jpeg"}
          objectFit={"cover"}
        />
      </Flex>
    </SimpleGrid>
  </Container>
}