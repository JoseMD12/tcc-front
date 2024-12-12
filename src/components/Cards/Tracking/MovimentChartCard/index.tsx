import React, { useContext, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { Select } from "@chakra-ui/react";
import ICardProps from "../../ICardProps";
import { boxSize } from "../../../../constants/boxSize";
import {
    exportMovimentationChart,
    listDeposits,
    listProducts,
    movimentationChart,
} from "../../../../services/services";
import { FontSize } from "../../../../enum/Font";
import { Color } from "../../../../enum/Color";
import ButtonExport from "../../../Base/ButtonExport";
import LineChart from "../../../Charts/LineChart";
import BaseAutocompleteInput from "../../../Base/BaseAutocompleteInput";
import { AppContext } from "../../../../context/AppContext";

export default function MovimentChartCard(props: ICardProps) {
    const size = boxSize["l"];
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
    const [search, setSearch] = React.useState<string>("");
    const [movimentationFilter, setMovimentationFilter] =
        React.useState<string>("");
    const [depositFilter, setDepositFilter] = React.useState<string>("");
    const [products, setProducts] = React.useState<
        { id: string; description: string }[]
    >([]);

    async function getData(
        movingTypeParam: string,
        depositParam?: string,
        searchParam?: string
    ) {
        try {
            const deposits: {
                id: string;
                name: string;
                type: string;
                maxQuantity: number;
            }[] = await listDeposits();

            setDeposits(deposits);

            const products: { id: string; description: string }[] =
                await listProducts();

            setProducts(products);

            if (movingTypeParam === "") {
                movingTypeParam = "In";
            }

            const chartData: {
                name: string;
                monthNumber: number;
                totalAmount: number;
            }[] = await movimentationChart(
                movingTypeParam,
                depositParam,
                searchParam
            );

            const chartDataSorted = chartData.sort((a, b) => {
                return a.monthNumber - b.monthNumber;
            });

            setLabels(chartDataSorted.map((produto) => produto.name));
            setDataValues(
                chartDataSorted.map((produto) => produto.totalAmount)
            );
        } catch (error) {
            return error;
        }
    }

    const { wasTagRead, setWasTagRead } = useContext(AppContext);

    useEffect(() => {
        if (wasTagRead || products.length === 0 || deposits.length === 0) {
            getData(movimentationFilter, depositFilter, search);
            setWasTagRead(false);
        }
    }, [wasTagRead]);

    const handleExportButton = async (
        movingTypeParam: string,
        depositParam: string,
        searchParam: string
    ) => {
        try {
            if (movingTypeParam === "") {
                movingTypeParam = "In";
            }

            const response = await exportMovimentationChart(
                movingTypeParam,
                depositParam,
                searchParam
            );
            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = "movimentacoes.xlsx";
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

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
            gap='2rem'
        >
            <Flex
                width='100%'
                justifyContent='space-between'
                position={"relative"}
            >
                <Text fontSize={FontSize["subtitle"]} fontWeight='bold'>
                    Movimentação
                </Text>
                <Flex
                    flexDirection='column'
                    gap='1rem'
                    alignItems='flex-end'
                    position='absolute'
                    right={0}
                    top={0}
                >
                    <Flex direction='row' gap='1rem'>
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
                                getData(
                                    movimentationFilter,
                                    e.target.value,
                                    search
                                );
                            }}
                        >
                            {deposits.map((deposit, index) => (
                                <option key={index} value={deposit.id}>
                                    {deposit.name}
                                </option>
                            ))}
                        </Select>

                        <Select
                            mt='0.5rem'
                            placeholder='Movimentação'
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
                                setMovimentationFilter(e.target.value);
                                getData(e.target.value, depositFilter, search);
                            }}
                            defaultValue='In'
                        >
                            <option value='In'>Entrada</option>
                            <option value='Out'>Saída</option>
                            {depositFilter === "" ? (
                                <option value='Change'>
                                    Troca de Depósito
                                </option>
                            ) : null}
                        </Select>

                        <BaseAutocompleteInput
                            suggestions={products}
                            width='18rem'
                            placeholder='Pesquisar produto'
                            value={search}
                            setValue={(e) => setSearch(e)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    getData(
                                        movimentationFilter,
                                        depositFilter,
                                        search
                                    );
                                }
                            }}
                        />
                    </Flex>
                    <ButtonExport
                        buttonName='Relatório'
                        width='9rem'
                        hasIcon
                        onClick={() =>
                            handleExportButton(
                                movimentationFilter,
                                depositFilter,
                                search
                            )
                        }
                    />
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
            </Flex>
            <LineChart labels={labels} dataValues={dataValues} width='85%' />
        </Flex>
    );
}
