import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import links from "../../data/navlinks.json";
import NavLink from "./NavLink";
import MenuButton from "./menu/MenuButton";
import MenuDrawer from "./menu/MenuDrawer";
import styled from "@emotion/styled";

import DarkModeSwitch from "../../components/DarkModeSwitch";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const [isLargerThan425] = useMediaQuery("(min-width: 425px)");
  const [larger, setLarger] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = {
    light: "gray.50",
    dark: "gray.800",
  }; 

  const color = {
    light: "gray.800",
    dark: "gray.100",
  };

  const navBranch = {
    light: "teal.500",
    dark: "teal.300"
  }

  useEffect(() => {
    setLarger(isLargerThan425);
  }, [isLargerThan425]);

  return (
    <>
      <Box
        as="nav"
        pos="fixed"
        py={6}
        mx="auto"
        w="full"
        left={0}
        zIndex="docked"
        bgColor={bgColor[colorMode]}
        color={color[colorMode]}
      >
        <Container maxW="container.lg">
          <HStack justify="space-between">
            <Link href="/">
              <Heading
                as="h2"
                size="lg"
                transition="all 0.2s ease-in-out"
                color={navBranch[colorMode]}
                _hover={{
                  cursor: "pointer",
                }}
              >
                nfebriyan
              </Heading>
            </Link>
            {larger && (
              <HStack spacing={10}>
                {links.map((link, index) => (
                  <NavLink
                    key={String(index)}
                    link={link.url}
                    name={link.name}
                  />
                ))}
              </HStack>
            )}
            <Box>
            <DarkModeSwitch />
            {!larger && (
              <>
                <MenuButton onOpen={onOpen} />
                <MenuDrawer isOpen={isOpen} onClose={onClose} links={links} />
              </>
            )}
            </Box>
          </HStack>
        </Container>
      </Box>
      
    </>
  );
};

export default Navbar;
