import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { MdHome, MdBook, MdAccountCircle } from "react-icons/md";
import React from "react";
import BarChart from "../../components/Chart/bar";
import DoughnutGraph from "../../components/Chart/doughnut";
import BottomBar from "../../components/BottomBar";
import Expenses from "../../components/Expenses";

function App() {
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Heading textAlign={"center"} fontSize="2xl">
          Jiffy Bag
        </Heading>

        <Container flex={1}>
          {/* <BarChart />
          <DoughnutGraph /> */}
        </Container>
        <Container flex={1}>
          <Expenses />
        </Container>

        <BottomBar />
      </Flex>
    </Container>
  );
}

export default App;
