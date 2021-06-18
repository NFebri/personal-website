import { useColorMode, Button, Flex, Box, Heading } from "@chakra-ui/react";

import Navbar from "./nav/Navbar";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "gray.50",
    dark: "gray.800",
  }; 

  const color = {
    light: "gray.800",
    dark: "gray.100",
  };

  

  return (
    <>
      <Navbar />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
      >
        {children}
      </Flex>
    </>
  );
};

export default Container;
