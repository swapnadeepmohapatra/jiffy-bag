import { gql } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { nhost } from "../../pages/_app";

function Expenses() {
  const { data } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entryType, setEntryType] = useState("");
  const [amt, setAmt] = useState(0);

  async function addFinanceData(type, value) {
    const CREATE_USER = gql`
	mutation {
		insert_user_finance_details_one(object: { type: "${type}", user: "${data.user.email}", value: "${value}"}) {
		  user
		  type
		  value
		  user_detail {
			id
		  }
		}
	  }`;

    const result = await nhost.graphql.request(CREATE_USER);

    console.log(result);
  }

  return (
    <Container>
      <Box>
        <Flex gap={"1rem"}>
          <Button
            width={"100%"}
            backgroundColor={"green"}
            onClick={() => {
              setEntryType("money");
              onOpen();
            }}
            // onClick={() => addFinanceData("money", "500")}
          >
            Add Money
          </Button>
          <Button
            width={"100%"}
            backgroundColor={"red"}
            onClick={() => {
              setEntryType("expense");
              onOpen();
            }}
            // onClick={() => addFinanceData("expense", "500")}
          >
            Add Expense
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Amount</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
              type={"number"}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addFinanceData(entryType, amt);
                onClose();
              }}
            >
              Add {entryType}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Expenses;
