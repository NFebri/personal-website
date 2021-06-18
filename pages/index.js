import Head from 'next/head'
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Box
} from '@chakra-ui/react'

export default function Home() {
  const { colorMode } = useColorMode()
  const colorSecondary = {
    light: "teal.500",
    dark: "teal.300"
  }
  return (
    <>
      <Head>
        <title>Home - Niko Febriyanto</title>
      </Head>
      <Flex align="center" justify="center" minH="100vh">
        <Box pb="72px" textAlign="center">
          <Heading as="h1" mb={4}>
            <Flex>Hello, I&apos;m &nbsp;<Text color={colorSecondary[colorMode]}>Niko Febriyanto</Text></Flex>
          </Heading>
          <Text fontSize="2xl" fontWeight="600">
            Web Developer - Backend Enthusiast
          </Text>
        </Box>
      </Flex>
    </>
  ) 
}
