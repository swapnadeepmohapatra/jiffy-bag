import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { MdHome, MdBook, MdAccountCircle } from "react-icons/md";
import React from "react";
import BarChart from "../../components/Chart/bar";
import DoughnutGraph from "../../components/Chart/doughnut";
import BottomBar from "../../components/BottomBar";
import Expenses from "../../components/Expenses";
import { getSession, useSession } from "next-auth/react";
import { gql } from "@apollo/client";
import { nhost } from "../_app";

function App({ user_finance_details }) {
  console.log(user_finance_details);
  return (
    <Container maxW="md" padding={"1rem"} height="100vh">
      <Flex flexDirection={"column"} height="100%">
        <Heading textAlign={"center"} fontSize="2xl">
          Jiffy Bag
        </Heading>

        <Container flex={1}>
          <BarChart />
          {/* <DoughnutGraph /> */}
        </Container>
        <Container flex={1}>
          <Expenses />
        </Container>

        <BottomBar />
      </Flex>
    </Container>
  );
}

// export async function getStaticProps(context) {
//   console.log(context);
//   const session = await getSession(context);
//   // const dd = await useSession();

//   console.log(session);
//   // console.log(dd);

//   const FINANCE_HISTORY = gql`
//     {
//       user_finance_details(where: { user: { _eq: "hello@swapnadeep.com" } }) {
//         type
//         value
//       }
//     }
//   `;

//   // const nhostSession = await useQuery(FINANCE_HISTORY);
//   const data = await nhost.graphql.request(FINANCE_HISTORY);

//   console.log(data);

//   if (data.error) {
//     return {
//       props: {
//         error: data.error,
//       },
//     };
//   }

//   return {
//     props: {
//       user_finance_details: data.data.user_finance_details,
//     },
//   };
// }

export default App;
