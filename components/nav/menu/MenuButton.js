import { IconButton, useColorMode } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
const MenuButton = ({ onOpen }) => {
  const { colorMode } = useColorMode();

  const color = {
    light: "gray.800",
    dark: "gray.100",
  };
  return (
    <IconButton
      aria-label="Open menu"
      icon={<HamburgerIcon size="24px" color={color[colorMode]} />}
      onClick={onOpen}
    />
  );
}

export default MenuButton;
