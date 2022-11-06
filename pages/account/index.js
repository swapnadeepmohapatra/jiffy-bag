import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
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
          <Box
            backgroundColor={"gray.700"}
            padding="1rem"
            borderRadius={"1rem"}
            marginTop="4rem"
            marginBottom="1rem"
          >
            <Heading textAlign={"center"} fontSize="lg">
              Track Your Bills
            </Heading>
          </Box>
          <Box
            backgroundColor={"gray.700"}
            padding="1rem"
            borderRadius={"1rem"}
            marginTop="1rem"
            marginBottom="1rem"
          >
            <Heading textAlign={"center"} fontSize="lg">
              Manage Your Spends
            </Heading>
          </Box>
          <Box
            backgroundColor={"gray.700"}
            padding="1rem"
            borderRadius={"1rem"}
            marginTop="1rem"
            marginBottom="1rem"
          >
            <Heading textAlign={"center"} fontSize="lg">
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Text>Referal Code: </Text>
                <Text fontWeight={"normal"} marginLeft="1">
                  {'"MAKEusWIN"'}
                </Text>
              </Flex>
            </Heading>
          </Box>
          <Box
            backgroundColor={"gray.700"}
            padding="1rem"
            borderRadius={"1rem"}
            marginTop="1rem"
            marginBottom="1rem"
          >
            <Heading textAlign={"center"} fontSize="lg">
              Invest With us
            </Heading>
          </Box>
          <Box
            backgroundColor={"gray.700"}
            padding="1rem"
            borderRadius={"1rem"}
            marginTop="1rem"
            marginBottom="1rem"
          >
            <Heading textAlign={"center"} fontSize="lg">
              About Us
            </Heading>
          </Box>
        </Box>
        <BottomBar />
      </Flex>
    </Container>
  );
}

export default Account;
