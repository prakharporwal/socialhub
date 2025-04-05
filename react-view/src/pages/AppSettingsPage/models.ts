import { ThemeTypings } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface AppDetails {
  icon: IconType;
  name: string;
  buttonText: string;
  buttonColorScheme: ThemeTypings["colorSchemes"];
  buttonComponent?: React.FC;
  description: string;
  connected: false;
  active: boolean;
  permission?: string;
  onClick?: () => void;
}
