import {
  EditablePreview,
  useColorModeValue,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

type CustomEditableTextProps = {
  text: string;
};
export default function CustomEditableText({ text }: CustomEditableTextProps) {
  /* Here's a custom control */
  function EditableControls(props: any) {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup
        justifyContent="end"
        size="sm"
        w={props.w}
        spacing={2}
        mt={2}
      >
        <IconButton
          icon={<CheckIcon />}
          aria-label="Submit changes"
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          aria-label="Cancel editing"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }

  return (
    <Editable
      defaultValue={text}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      w={{ base: 60, md: 72, lg: 96 }}
    >
      <Tooltip label="Click to edit" shouldWrapChildren={true}>
        <EditablePreview
          pt={2}
          pb={1}
          px={4}
          h={"32px"}
          background={useColorModeValue("gray.100", "gray.700")}
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
          w={{ base: 60, md: 72, lg: 96 }}
          noOfLines={1}
        />
      </Tooltip>
      <Input
        py={2}
        px={4}
        as={EditableInput}
        whiteSpace={"nowrap"}
        w={{ base: 60, md: 72, lg: 96 }}
      />
      <EditableControls w={{ base: 60, md: 72, lg: 96 }} />
    </Editable>
  );
}
