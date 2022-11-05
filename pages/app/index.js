import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { MdHome, MdBook, MdAccountCircle } from "react-icons/md";
import React from "react";

function App() {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Heading textAlign={"center"}>Jiffy Bag</Heading>

        <Container flex={1}>pa</Container>

        <Flex flexDirection={"row"} marginTop={"1rem"}>
          <Box flex={1} backgroundColor={""}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <MdHome size={32} />
            </Flex>
          </Box>
          <Box flex={1} backgroundColor={""}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <MdBook size={32} />
            </Flex>
          </Box>
          <Box flex={1} backgroundColor={""}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <MdAccountCircle size={32} />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}

export default App;
