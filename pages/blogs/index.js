import { NextSeo } from 'next-seo';
import { createClient } from 'contentful';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import Head from 'next/head'
import Card from '../../components/blog/Card';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "blog" });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 1,
  };
}

export default function Blogs({ blogs }) {
  console.log(blogs);
  const title = "Blog"
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`;
  return (
    <Box minH="100vh">
      <Head>
        <title>Blog - Niko Febriyanto</title>
      </Head>
      <NextSeo title={title} canonical={url} openGraph={{ url, title }} />

      <Heading as="h1" mt='120px' mb="30px" textAlign="center">
        Blog
      </Heading>
      {/* <Text my={5} fontWeight="600" textAlign="center">
        Sharing by Writing
      </Text> */}
      <VStack spacing={6}>
        {blogs.map((blog) => {
          const { slug, summary, title, tag } = blog.fields;
          const { createdAt, id } = blog.sys;

          return (
            <Card
              key={id}
              slug={slug}
              summary={summary}
              title={title}
              tags={tag}
              createdAt={createdAt}
            />
          );
        })}
      </VStack>
    </Box>
  );
}
