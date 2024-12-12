import { Flex, Text, Select } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import React, { useContext, useEffect } from "react";
import ICardProps from "../../ICardProps";
import { boxSize } from "../../../../constants/boxSize";
import { depositOcupation, listDeposits } from "../../../../services/services";
import { FontSize } from "../../../../enum/Font";
import { Color } from "../../../../enum/Color";
import PieChart from "../../../Charts/PieChart";
import { AppContext } from "../../../../context/AppContext";

export default function DepositChartCard(props: ICardProps) {
    const size = boxSize["m"];
    // const toast = useToast();
    const [depositFilter, setDepositFilter] = React.useState<string>("");
    const [labels, setLabels] = React.useState<string[]>([]);
    const [dataValues, setDataValues] = React.useState<number[]>([]);
    const [deposits, setDeposits] = React.useState<
        {
            id: string;
            name: string;
            type: string;
            maxQuantity: number;
        }[]
    >([]);

    async function getData(depositParam: string) {
        try {
            const deposits: {
                id: string;
                name: string;
                type: string;
                maxQuantity: number;
            }[] = await listDeposits();

            setDeposits(deposits);

            if (depositFilter !== "") {
                const data: {
                    name: string;
                    percentOfUsage: string;
                    percentOfFreeSpace: string;
                } = await depositOcupation(depositParam);

                setLabels(["Ocupado", "Livre"]);
                setDataValues([
                    parseFloat(data.percentOfUsage),
                    parseFloat(
                        Number(data.percentOfFreeSpace) < 0
                            ? "0"
                            : data.percentOfFreeSpace
                    ),
                ]);
            }
        } catch (error) {
            return error;
        }
    }

    const { wasTagRead, setWasTagRead } = useContext(AppContext);

    useEffect(() => {
        if (wasTagRead || deposits.length === 0) {
            getData(depositFilter);
            setWasTagRead(false);
        }
    }, [wasTagRead]);

    return (
        <Flex
            h={size.height}
            w={size.width}
            backgroundColor='rgb(241, 241, 241)'
            borderRadius='0.8rem'
            boxShadow='lg'
            px='1.5rem'
            py='1.25rem'
            flexDirection='column'
            gap='0.75rem'
        >
            <Flex direction='row'>
                <Text fontSize={FontSize["subtitle"]} fontWeight='bold'>
                    Ocupação por Depósito
                </Text>

                <Select
                    mt='0.5rem'
                    placeholder='Depósito'
                    w='12rem'
                    borderRadius='1rem'
                    boxShadow='lg'
                    backgroundColor='#F1F1F1'
                    color='#718096'
                    _focus={{
                        border: "0.2rem solid",
                        borderColor: Color.focusOrange,
                        boxShadow: "lg",
                    }}
                    onChange={(e) => {
                        setDepositFilter(e.target.value);
                        getData(e.target.value);
                    }}
                >
                    {deposits.map((deposit, index) => (
                        <option key={index} value={deposit.id}>
                            {deposit.name}
                        </option>
                    ))}
                </Select>
            </Flex>

            <PieChart labels={labels} dataValues={dataValues} width='full' />

            <Flex
                alignSelf='flex-end'
                fontSize={FontSize["bookMark"]}
                color='rgb(233, 113, 50)'
                _hover={{
                    cursor: "pointer",
                    color: "rgba(233, 113, 50, 0.5)",
                }}
                hidden
            >
                {props.isSaved ? <BsBookmarkFill /> : <BsBookmark />}
            </Flex>
        </Flex>
    );
}
