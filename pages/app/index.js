import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { MdHome, MdBook, MdAccountCircle } from "react-icons/md";
import React from "react";
import BarChart from "../../components/Chart/bar";
import DoughnutGraph from "../../components/Chart/doughnut";
import BottomBar from "../../components/BottomBar";

function App() {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Heading textAlign={"center"}>Jiffy Bag</Heading>

        <Container flex={1}>
          <BarChart />
          <DoughnutGraph />
        </Container>

        <BottomBar />
      </Flex>
    </Container>
  );
}

export default App;
