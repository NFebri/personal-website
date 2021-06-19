import { createClient } from "contentful"
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Badge, Box, Container, Heading, HStack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'blog' })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })
  
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'blog',
    'fields.slug': params.slug
  })
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanet: false,
      }
    }
  }
  return {
    props: { blog: items[0] },
    revalidate: 1
  }
}

export default function BlogDetails({ blog }) {
  console.log(blog)
  const { title, thumbnail, tag, content, slug, summary } = blog.fields
  const { createdAt, updatedAt } = blog.sys;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`;
  const { file } = thumbnail.fields;
  const { width, height } = file.details.image;
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          title,
          description: summary,
          url,
          type: 'article',
          article: {
            publishedTime: createdAt,
            modifiedTime: updatedAt,
            author: ['Niko Febriyanto'],
            tags: tag.map((tg) => tg),
          },
          images: [
            {
              url: `https:${thumbnail.fields.file.url}`,
              width,
              height,
              alt: title,
            },
          ],
        }}
      />
      <Container maxW="container.lg"  minH="100vh">
        <Box 
          as="figure"
          pt="100px"
          mx="auto"
          w="full"
          textAlign="center"
          rounded="md"
          overflow="hidden"
        >
          <Image 
            src={'https:' + thumbnail.fields.file.url}
            width={width}
            height={height}
          />
        </Box>
        <Text pt={1} fontWeight="600">
          Published on {format(new Date(createdAt), 'EEEE, MMMM do, yyyy')}
        </Text>
        <Heading as="h1" my={3}>
          {title}
        </Heading>
        <HStack>
        {tag.map((tg) => (
          <Badge
            key={tg}
            variant="solid"
            py={1}
            px={2}
            bg="gray.600"
            fontWeight="500"
            textTransform="capitalize"
            rounded="md"
            shadow="inner"
          >
            {tg}
          </Badge>
        ))}
      </HStack>
      <Text mt='20px'>{documentToReactComponents(content)}</Text>
      </Container>
    </>
  )
}