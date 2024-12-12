import { Flex } from "@chakra-ui/react";
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    labels: string[];
    dataValues: number[];
    width?: string;
}

export default function LineChart({
    labels,
    dataValues,
    width = "100%",
}: LineChartProps) {
    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: "rgba(233, 113, 50, 1)",
                borderColor: "rgba(233, 113, 50, 1)",
                borderWidth: 1,
                barThickness: 20,
                tension: 0.05,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            width: width,
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
            },
        },
    };

    return (
        <Flex height='100%' width={width}>
            <Line data={data} options={options} />
        </Flex>
    );
}
