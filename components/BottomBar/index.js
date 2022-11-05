import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MdAccountCircle, MdBook, MdHome } from "react-icons/md";

function BottomBar() {
  return (
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
  );
}

export default BottomBar;
