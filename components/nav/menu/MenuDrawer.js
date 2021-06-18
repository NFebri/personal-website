import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import NavLink from "../NavLink";

const MenuDrawer = ({ isOpen, onClose, links }) => {
  const colorMode = useColorMode()
  const bgColor = {
    light: "gray.50",
    dark: "gray.800"
  }
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent roundedTop="xl" overflow="hidden">
        <DrawerBody py={6} bg={bgColor[colorMode]}>
          <VStack spacing={4}>
            {links.map((link, index) => (
              <NavLink
                key={String(index)}
                link={link.url}
                name={link.name}
                hasBg
                onClose={onClose}
              />
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MenuDrawer;
