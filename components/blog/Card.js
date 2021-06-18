import Link from 'next/link';
import { Badge, Container, Flex, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';

const Card = ({ createdAt, slug, summary, tags, title }) => {
  const {colorMode} = useColorMode()
  const cardHover = {
    light: "gray.100",
    dark: "gray.700"
  }
  const cardBorder = {
    light: "gray.300",
    dark: "gray.700"
  }
  return (
    <Link href={`/blog/${slug}`} passHref>
      <Container maxW="container.lg">
        <VStack
          as="article"
          spacing={4}
          p={6}
          w="full"
          textAlign="left"
          rounded="md"
          transition="all 0.2s ease-in-out"
          border="1px"
          borderColor={cardBorder[colorMode]}
          _hover={{
            bg: cardHover[colorMode],
            cursor: 'pointer',
            transform: 'translateY(-3px);',
          }}
        >
          <HStack justify="space-between">
            <Heading size="lg" _hover={{ textDecor: 'underline' }}>
              {title}
            </Heading>
            <Text fontWeight="600">
              {format(new Date(createdAt), 'MM/dd/yyyy')}
            </Text>
          </HStack>
          <Text fontWeight="500" lineHeight="tall" noOfLines={[4, 3]}>
            {summary}
          </Text>
          <HStack>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="solid"
                py={1}
                px={2}
                bg="gray.600"
                fontWeight="500"
                textTransform="capitalize"
                rounded="md"
                shadow="inner"
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </Container>
    </Link>
  );
}

export default Card;