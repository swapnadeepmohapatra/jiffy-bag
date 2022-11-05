import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import AccountDetails from "../../components/Account";
import BottomBar from "../../components/BottomBar";

function Account() {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Box>
          <Heading textAlign={"center"} fontSize="2xl">
            Account
          </Heading>
        </Box>
        <Box flex={"1"}>
          <AccountDetails />
        </Box>
        <BottomBar />
      </Flex>
    </Container>
  );
}

export default Account;
