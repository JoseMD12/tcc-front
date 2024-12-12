import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Box, Flex } from "@chakra-ui/react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DoubleBarChartProps {
    labels: string[];
    dataSet1: number[];
    dataSet2: number[];
    width?: string;
}

const DoubleBarChart: React.FC<DoubleBarChartProps> = ({
    labels,
    dataSet1,
    dataSet2,
    width = "100%",
}) => {
    const data = {
        labels,
        datasets: [
            {
                label: "Planejado Acumulado",
                data: dataSet1,
                backgroundColor: "rgb(233, 113, 50)",
                borderColor: "rgb(233, 113, 50)",
                borderWidth: 1,
                barThickness: 30,
            },
            {
                label: "Saldo Acumulado",
                data: dataSet2,
                backgroundColor: "rgb(241, 180, 164)",
                borderColor: "rgb(241, 180, 164)",
                borderWidth: 0.5,
                barThickness: 30,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 500,
                },
                grid: {
                    display: true,
                },
            },
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    callback: function (value: number | string): string {
                        const label = labels[Number(value)];
                        const finalLabel =
                            label.length > 10
                                ? label.slice(0, 10) + "..."
                                : label;

                        return finalLabel;
                    },
                },
            },
        },
    };

    return (
        <Flex overflowX='auto' width={width} pt='1rem' height='full'>
            <Box minWidth='62rem' pr='1rem'>
                <Bar data={data} options={options} />
            </Box>
        </Flex>
    );
};

export default DoubleBarChart;
