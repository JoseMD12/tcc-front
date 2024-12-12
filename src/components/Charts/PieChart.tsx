import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Flex } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    labels: string[];
    dataValues: number[];
    width?: string;
}

const PieChart: React.FC<PieChartProps> = ({
    labels,
    dataValues,
    width = "100%",
}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    "rgba(233, 113, 50, 1)",
                    "rgba(241, 180, 164, 1)",
                ],
                borderColor: [
                    "rgba(233, 113, 50, 1)",
                    "rgba(241, 180, 164, 1)",
                ],
                borderWidth: 1,
                hoverOffset: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "right" as const,
            },
        },
    };

    return (
        <Flex justify='center' width={width} height='full'>
            <Pie data={data} options={options} />
        </Flex>
    );
};

export default PieChart;
