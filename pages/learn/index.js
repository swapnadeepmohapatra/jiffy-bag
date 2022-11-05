import { gql } from "@apollo/client";
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import BottomBar from "../../components/BottomBar";
import { nhost } from "../_app";

function Learn({ learning_modules }) {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Box>
          <Heading textAlign={"center"} fontSize="2xl">
            Learning Modules
          </Heading>
        </Box>
        <Box
          flex={"1"}
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#718096",
              borderRadius: "24px",
            },
          }}
        >
          <Grid gap={4} padding={"1rem 0"}>
            {learning_modules &&
              learning_modules.map((module) => {
                return (
                  <Box
                    key={module.id}
                    backgroundColor={"gray.700"}
                    borderRadius="lg"
                    padding={"1rem 2rem"}
                  >
                    <Link href={`/learn/${module.id}`}>
                      <Text>{module.topic}</Text>
                    </Link>
                  </Box>
                );
              })}
          </Grid>
        </Box>
        <BottomBar />
      </Flex>
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
