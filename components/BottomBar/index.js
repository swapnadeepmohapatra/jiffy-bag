import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { MdAccountCircle, MdBook, MdHome } from "react-icons/md";

function BottomBar() {
  return (
    <Flex flexDirection={"row"} marginTop={"1rem"}>
      <Box flex={1} backgroundColor={""}>
        <Link href={"/app"}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <MdHome size={32} />
          </Flex>
        </Link>
      </Box>
      <Box flex={1} backgroundColor={""}>
        <Link href={"/learn"}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <MdBook size={32} />
          </Flex>
        </Link>
      </Box>
      <Box flex={1} backgroundColor={""}>
        <Link href="/account">
          <Flex alignItems={"center"} justifyContent={"center"}>
            <MdAccountCircle size={32} />
          </Flex>
        </Link>
      </Box>
    </Flex>
  );
}

export default BottomBar;
