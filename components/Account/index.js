import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function AccountDetails() {
  const { data: session } = useSession();

  console.log(session);

  if (!session) {
    return <h1>Error</h1>;
  }

  return (
    <Container
      maxW="md"
      padding={"1rem"}
      marginTop={"1rem"}
      backgroundColor={"#1FE7CA"}
      borderRadius="lg"
    >
      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          padding={4}
          flexDirection={"column"}
        >
          <img
            src={
              session.user.image ||
              "https://lh3.googleusercontent.com/a/ALm5wu1wf5F6CnKBVw9Q3IcPeQ94v5MKKxXLtswSHddaeA=s96-c"
            }
            alt=""
            srcset=""
            style={{
              borderRadius: "50%",
            }}
          />
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"black"}
            marginTop={"1"}
          >
            {toTitleCase(session.user.name)}
          </Text>
        </Flex>
      </Box>
    </Container>
  );
}

export default AccountDetails;
