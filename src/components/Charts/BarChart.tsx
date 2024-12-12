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
import { Flex } from "@chakra-ui/react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    labels: string[];
    dataValues: number[];
    percentOfUsage: number[];
    width?: string;
}

const BarChart: React.FC<BarChartProps> = ({
    labels,
    dataValues,
    percentOfUsage,
    width = "100%",
}) => {
    const colors = percentOfUsage.map((usage) => {
        if (usage >= 100) return "rgba(208, 26, 26, 1)";
        if (usage >= 90) return "rgba(192, 92, 39, 1)";
        if (usage >= 50) return "rgba(233, 113, 50, 1)";
        return "rgba(241, 180, 164, 1)";
    });
    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                barThickness: 20,
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
                labels: {
                    generateLabels: () => [
                        {
                            text: "Acima de 100%",
                            fillStyle: "rgba(208, 26, 26, 1)",
                        },
                        {
                            text: "Entre 90% e 99%",
                            fillStyle: "rgba(192, 92, 39, 1)",
                        },
                        {
                            text: "Entre 50% e 89%",
                            fillStyle: "rgba(233, 113, 50, 1)",
                        },
                        {
                            text: "Abaixo de 50%",
                            fillStyle: "rgba(241, 180, 164, 1)",
                        },
                    ],
                },
            },
            width: width,
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1000,
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
        <Flex width={width} height={"full"} pt='1rem'>
            <Bar data={data} options={options} />
        </Flex>
    );
};

export default BarChart;
