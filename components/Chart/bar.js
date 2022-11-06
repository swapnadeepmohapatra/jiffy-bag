import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { gql } from "@apollo/client";
import { nhost } from "../../pages/_app";
import { Flex, Text } from "@chakra-ui/react";

Chart.register(CategoryScale);

function BarChart() {
  const [financeList, setFinanceList] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [money, setMoney] = useState(0);
  const [barData, setBarData] = useState({
    food: 0,
    petrol: 0,
    apparel: 0,
    gadgets: 0,
    misc: 0,
  });

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

      result.data.user_finance_details.forEach((item) => {
        if (item.type === "expense") {
          setExpenses((s) => s + Number(item.value));
        } else {
          setMoney((s) => s + Number(item.value));
        }
        setBarData((s) => {
          return {
            ...s,
            [item.category]: s[item.category] + Number(item.value),
          };
        });
      });
    }

    fetchData();
  }, []);

  const data = {
    labels: ["food", "petrol", "apparel", "gadgets", "misc"],
    datasets: [
      {
        label: "Expenses",
        data: [
          barData.food,
          barData.petrol,
          barData.apparel,
          barData.gadgets,
          barData.misc,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: true,
        }}
      />
      <Flex
        gap={"1rem"}
        alignItems="center"
        justifyContent={"space-between"}
        marginLeft="1rem"
        marginRight="1rem"
        marginTop="1rem"
      >
        <Text
          backgroundColor={"gray.700"}
          padding={"1rem"}
          flex="1"
          borderRadius={"1rem"}
        >
          Expenses: {expenses / 2}
        </Text>
        <Text
          backgroundColor={"gray.700"}
          padding={"1rem"}
          flex="1"
          borderRadius={"1rem"}
        >
          Money Left: {(money - expenses) / 2}
        </Text>
      </Flex>
    </div>
  );
}

export default BarChart;
