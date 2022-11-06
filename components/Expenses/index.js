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
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { nhost } from "../../pages/_app";

function Expenses() {
  const { data } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entryType, setEntryType] = useState("");
  const [amt, setAmt] = useState(0);
  const [financeList, setFinanceList] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [categoryType, setCategoryType] = useState("");

  function doRefetch() {
    setRefetch((s) => !s);
  }

  useEffect(() => {
    async function fetchData() {
      const FINANCE_HISTORY = gql`
        {
          user_finance_details(
            where: { user: { _eq: "swapnadeep456@gmail.com" } }
          ) {
            id
            type
            value
            category
            time
          }
        }
      `;

      // const nhostSession = await useQuery(FINANCE_HISTORY);
      const result = await nhost.graphql.request(FINANCE_HISTORY);

      console.log(result);
      setFinanceList(result.data.user_finance_details);
    }

    fetchData();
  }, [entryType, refetch]);

  function getCategoryEmoji(cat) {
    switch (cat) {
      case "food":
        return "🍔";
      case "petrol":
        return "⛽";
      case "apparel":
        return "🛍️";
      case "gadgets":
        return "🎮";
      case "misc":
        return "🏥";
      default:
        return "🤷‍♂️";
    }
  }

  async function addFinanceData(type, value) {
    const CREATE_USER = gql`
mutation {
		insert_user_finance_details_one(object: { type: "${type}", user: "${
      data.user.email
    }", value: "${value}" ${
      type === "expense" ? `, category: "${categoryType}"` : ""
    } }) {
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

    doRefetch();
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
      <Box
        marginTop={"1rem"}
        height={"40vh"}
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
        {financeList.reverse().map((item) => (
          <Flex
            key={item.id}
            backgroundColor={item.type === "expense" ? "red.800" : "green.800"}
            padding={"0.2rem 0.5rem"}
            borderRadius={"0.5rem"}
            margin={"0.5rem 0"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"bold"}>
              {item.type === "expense" ? getCategoryEmoji(item.category) : "💰"}{" "}
              ₹ {item.value}
            </Text>
            <Text fontSize={"0.8rem"}>{item.time}</Text>
          </Flex>
        ))}
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

            {entryType === "expense" && (
              <Select
                marginTop={"1rem"}
                placeholder="Select Category"
                onChange={(e) => {
                  setCategoryType(e.target.value);
                }}
                value={categoryType}
              >
                <option value="food">Food</option>
                <option value="petrol">Petrol</option>
                <option value="apparel">Apparel</option>
                <option value="gadgets">Gadgets</option>
                <option value="misc">Misc</option>
              </Select>
            )}
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
