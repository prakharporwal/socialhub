import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

type IAlertPopUpProps = {
    title: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    successButtonAction: () => void;
    variant?: "warning" | "confirm" ; 
  description?: string;
  successBtnText?: string;
  cancelButtonText?: string;
  cancelButtonAction?: () => void;
};

export default function AlertPopUp(props: IAlertPopUpProps): JSX.Element {
  const { isOpen, setIsOpen } = props;
  const {
    title,
    description,
    successBtnText,
    cancelButtonText,
    successButtonAction,
    cancelButtonAction,
    variant
  } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setIsOpen(false);
                cancelButtonAction && cancelButtonAction();
              }}
            >
              {cancelButtonText}
            </Button>
            <Button
              colorScheme={variant && variant==='warning'? "red": "blue"}
              onClick={() => successButtonAction()}
              ml={3}
            >
              {successBtnText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
