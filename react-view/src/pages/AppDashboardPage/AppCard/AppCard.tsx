import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@chakra-ui/react";

export function AppCard(props: any) {
  const Icon = props.icon;
  const ButtonComponent = props.buttonComponent;
  return (
    <Card
      background={props.bgColor || "white"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CardHeader>
        <Text fontSize={"lg"} fontWeight={"600"}>
          {props.name}
        </Text>
      </CardHeader>
      <CardBody
        px={8}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box my={8}>
          {props.buttonComponent ? (
            <ButtonComponent />
          ) : (
            <Button
              variant={"solid"}
              colorScheme={props.buttonColorScheme}
              leftIcon={<Icon />}
            >
              {props.buttonText}
            </Button>
          )}
        </Box>
        <Text>{props.description}</Text>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
