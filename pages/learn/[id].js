import { gql } from "@apollo/client";
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import BottomBar from "../../components/BottomBar";
import { nhost } from "../_app";

function DetailPage({ lesson }) {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Heading textAlign={"center"} fontSize="2xl">
          {lesson.topic}
        </Heading>
        <Text fontSize="xl" textAlign={"justify"} flex={1} paddingTop={"1rem"}>
          {lesson.content}
        </Text>
        <BottomBar />
      </Flex>
    </Container>
  );
}

export const getStaticProps = async (context) => {
  // export const getServerSideProps = async (context) => {
  const lessonId = context.params.id;

  const GET_LESSON = gql`
	  {
		learning(
		  where: { id: { _eq: "${lessonId}" } }
		) {
		  id
		  topic
		  content
		}
	  }
	`;

  const data = await nhost.graphql.request(GET_LESSON);

  if (data.error) {
    return {
      props: {
        error: data.error,
      },
    };
  }

  return {
    props: {
      lesson: data.data.learning[0],
    },
  };
};

export async function getStaticPaths() {
  const GET_LEARNING_MODULES_LIST = gql`
    {
      learning {
        topic
        id
      }
    }
  `;

  // const nhostSession = await useQuery(GET_LEARNING_MODULES_LIST);
  const data = await nhost.graphql.request(GET_LEARNING_MODULES_LIST);

  if (data.error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  return {
    paths: data.data.learning.map((module) => ({
      params: {
        id: module.id,
      },
    })),
    fallback: "blocking",
  };
}

export default DetailPage;
