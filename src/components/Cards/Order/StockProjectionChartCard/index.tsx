import { Flex, Select, Switch, Text, useToast } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import React, { useContext, useEffect } from "react";
import { boxSize } from "../../../../constants/boxSize";
import ICardProps from "../../ICardProps";
import {
    exportStockProjection,
    listDeposits,
    listProducts,
    stockProjection,
} from "../../../../services/services";
import { FontSize } from "../../../../enum/Font";
import DoubleBarChart from "../../../Charts/DoubleBarChart";
import { Color } from "../../../../enum/Color";
import BaseAutocompleteInput from "../../../Base/BaseAutocompleteInput";
import ButtonExport from "../../../Base/ButtonExport";
import { AppContext } from "../../../../context/AppContext";

export default function StockProjectionChartCard(props: ICardProps) {
    const size = boxSize["l"];

    const [labels, setLabels] = React.useState<string[]>([]);
    const [dataValues1, setDataValues1] = React.useState<number[]>([]);
    const [dataValues2, setDataValues2] = React.useState<number[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [depositFilter, setDepositFilter] = React.useState<string>("");
    const [newOrdersState, setNewOrdersState] = React.useState(false);
    const [deposits, setDeposit] = React.useState<
        {
            id: string;
            name: string;
            type: string;
            maxQuantity: number;
        }[]
    >([]);
    const [products, setProducts] = React.useState<
        { id: string; description: string }[]
    >([]);
    const toast = useToast();

    async function getData(
        searchParam: string,
        depositFilter: string,
        newOrdersParam: boolean
    ) {
        try {
            const products: { id: string; description: string }[] =
                await listProducts();

            setProducts(products);

            const deposits: {
                id: string;
                name: string;
                type: string;
                maxQuantity: number;
            }[] = await listDeposits();

            if (searchParam) {
                const data: {
                    date: string;
                    stock: number;
                    order: number;
                }[] = await stockProjection(
                    searchParam,
                    newOrdersParam,
                    depositFilter
                );

                setLabels(
                    data.map((orderDateProjection) => orderDateProjection.date)
                );
                setDataValues1(
                    data.map((orderDateProjection) => orderDateProjection.order)
                );
                setDataValues2(
                    data.map((orderDateProjection) => orderDateProjection.stock)
                );
            } else {
                // toast({
                //     title: "Nenhum produto selecionado",
                //     status: "warning",
                //     duration: 5000,
                //     isClosable: true,
                // });
            }

            setDeposit(deposits);
        } catch (error) {
            return error;
        }
    }

    const { wasTagRead, setWasTagRead } = useContext(AppContext);

    useEffect(() => {
        if (wasTagRead || products.length === 0 || deposits.length === 0) {
            getData(search, depositFilter, newOrdersState);
            setWasTagRead(false);
        }
    }, [wasTagRead]);

    const handleExport = (
        productId: string,
        newOrdersState: boolean,
        depositId: string
    ) => {
        exportStockProjection(productId, newOrdersState, depositId)
            .then(async (response) => {
                // const blob = await response.blob();
                const url = window.URL.createObjectURL(response);
                const link = document.createElement("a");
                link.href = url;
                link.download = "projecao.xlsx";
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
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
                    Projeção de Estoque Negativo
                </Text>
                <Flex
                    flexDirection='column'
                    gap='1rem'
                    alignItems='flex-end'
                    position='absolute'
                    right={0}
                    top={0}
                >
                    <Flex direction='row' gap='1rem' w='full'>
                        <Flex align='center' gap='0.6rem' mt='0.5rem'>
                            <Text
                                fontSize='0.8rem'
                                color='#718096'
                                fontWeight='semibold'
                            >
                                Apenas Novos:
                            </Text>
                            <Switch
                                colorScheme='orange'
                                size='md'
                                onChange={() => {
                                    const newOrdersState2 = !newOrdersState;
                                    setNewOrdersState(newOrdersState2);
                                    getData(
                                        search,
                                        depositFilter,
                                        newOrdersState2
                                    );
                                }}
                            />
                        </Flex>

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
                                getData(search, e.target.value, newOrdersState);
                            }}
                        >
                            {deposits.map((deposit, index) => (
                                <option key={index} value={deposit.id}>
                                    {deposit.name}
                                </option>
                            ))}
                        </Select>

                        <BaseAutocompleteInput
                            suggestions={products}
                            width='18rem'
                            placeholder='Pesquisar Produto*'
                            value={search}
                            setValue={(e) => {
                                setSearch(e);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    getData(
                                        search,
                                        depositFilter,
                                        newOrdersState
                                    );
                                }
                            }}
                        />
                    </Flex>
                    <ButtonExport
                        buttonName='Relatório'
                        width='9rem'
                        hasIcon
                        onClick={() => {
                            if (!search) {
                                toast({
                                    title: "Nenhum produto filtrado",
                                    description:
                                        "Para exportar o relatório pesquise um produto.",
                                    status: "error",
                                    duration: 10000,
                                    isClosable: true,
                                    position: "top-right",
                                });
                            }
                            handleExport(search, newOrdersState, depositFilter);
                        }}
                    />
                </Flex>
            </Flex>
            <DoubleBarChart
                labels={labels}
                dataSet1={dataValues1}
                dataSet2={dataValues2}
                width='90%'
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
    );
}
