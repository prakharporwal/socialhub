import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";
import { AppDetails } from "./models";
import ConnectLinkedinAccountButton from "../../components/buttons/ConnectLinkedinAccountButton";
import { ConnectToYoutubeButton } from "../YoutubePage/ConnectToYoutubeButton/ConnectToYoutubeButton";
import { ConnectToTwitterButton } from "../TwitterPage/ConnectToTwitterButton/ConnectToTwitterButton";

export const integratedApps: AppDetails[] = [
  {
    icon: SiYoutube,
    name: "Youtube",
    buttonColorScheme: "red",
    buttonText: "Connect your YouTube",
    description: "Connect your YouTube account to monitor and share videos.",
    connected: false,
    active: true,
    permission: "user profile, see, edit, post, videos",
    buttonComponent: ConnectToYoutubeButton,
  },
  {
    icon: SiLinkedin,
    name: "Linkedin",
    buttonColorScheme: "linkedin",
    buttonText: "Connect your Linkedin",
    description: "Connect your linkedin account to see and manage posts.",
    connected: false,
    active: true,
    buttonComponent: ConnectLinkedinAccountButton,
  },
  {
    icon: SiInstagram,
    name: "Instagram",
    buttonColorScheme: "messenger",
    buttonText: "Connect your Instagram",
    description: "Connect your Instagram account to see and manage photos.",
    connected: false,
    active: true,
  },
  {
    icon: SiTwitter,
    name: "Twitter",
    buttonColorScheme: "twitter",
    buttonText: "Connect your Twitter",
    description: "Connect your Twitter account to see and manage posts.",
    connected: false,
    active: true,
    buttonComponent: ConnectToTwitterButton,
  },
  {
    icon: SiFacebook,
    name: "Facebook",
    buttonColorScheme: "facebook",
    buttonText: "Connect your Facebook",
    description: "Connect your Facebook account to see and manage posts.",
    connected: false,
    active: true,
  },
];
