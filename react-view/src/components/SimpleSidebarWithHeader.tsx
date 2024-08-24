import { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  DrawerOverlay,
} from "@chakra-ui/react";

import {
  Outlet,
  Link as ReactLink,
  NavLink as RouterNavLink,
  useNavigate,
} from "react-router-dom";

import { FiHome, FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { IconType } from "react-icons";
import ColorModeToggleButton from "./buttons/ColorModeToggleButton";
import { FaPlusCircle } from "react-icons/fa";
import { SiLinkedin, SiTwitter } from "react-icons/si";
import { logOut } from "../utils/logoutUtils";

interface LinkItemProps {
  name: string;
  linkTo?: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, linkTo: "/app/home" },
  { name: "Create Post", icon: FaPlusCircle, linkTo: "/app/post/new" },
  { name: "Linkedin", icon: SiLinkedin, linkTo: "/app/linkedin" },
  { name: "Twitter", icon: SiTwitter, linkTo: "/app/twitter" },
  // { name: "Instagram", icon: SiInstagram, linkTo: "/instagram" },
  // { name: "Facebook", icon: SiFacebook, linkTo: "/facebook" },
];

export default function SidebarWithHeader({
  children,
}: {
  children?: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent width={"100px"}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        user={{
          username: window.localStorage
            .getItem("current_username")
            ?.toUpperCase(),
          userType: window.localStorage.getItem("organisation_group_id"),
          imagSrc:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
          imgSrc:
            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
        }}
      />
      <Box ml={{ base: 0, md: 60 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx={8} justifyContent="space-between">
        <Link as={ReactLink} to="/">
          <Image src="/logo.png" alt="Logo" w={36} />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} linkTo={link.linkTo}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  linkTo: string | undefined;
  children: any;
}

const NavItem = ({ icon, linkTo, children, ...rest }: NavItemProps) => {
  return (
    <Link
      _activeLink={{
        color: "cyan.500",
        fontWeight: 700,
      }}
      as={RouterNavLink}
      to={linkTo}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        borderRadius="lg"
        p="4"
        mx="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: any;
}

const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
  let navigate = useNavigate();

  function handleLogout() {
    logOut();
    navigate("/signin");
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        display={{ base: "flex", md: "none" }}
        src="/logo.png"
        alt="Logo"
        w={32}
      />
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="notifications"
          icon={<FiBell />}
        />
        <ColorModeToggleButton />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"md"} src={user.imgSrc} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.userType}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              {/* <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
