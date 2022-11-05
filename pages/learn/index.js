import { gql } from "@apollo/client";
import { Box, Container, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import BottomBar from "../../components/BottomBar";
import { nhost } from "../_app";

function Learn({ learning_modules }) {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Box>Hello</Box>
      <Grid gap={4} padding={"1rem 0"}>
        {learning_modules &&
          learning_modules.map((module) => {
            return (
              <Link href={`/learn/${module.id}`} key={module.id}>
                <Text>{module.topic}</Text>
              </Link>
            );
          })}
      </Grid>
      <BottomBar />
    </Container>
  );
}

export async function getStaticProps() {
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
      props: {
        error: data.error,
      },
    };
  }

  return {
    props: {
      learning_modules: data.data.learning,
    },
  };
}

export default Learn;
