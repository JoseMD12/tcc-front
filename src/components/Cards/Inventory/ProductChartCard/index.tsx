import { Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import React, { useContext, useEffect } from "react";
import { boxSize } from "../../../../constants/boxSize";
import ICardProps from "../../ICardProps";
import {
    exportProductByDepositChart,
    listProducts,
    productByDepositChart,
} from "../../../../services/services";
import { FontSize } from "../../../../enum/Font";
import ButtonExport from "../../../Base/ButtonExport";
import BarChart from "../../../Charts/BarChart";
import BaseAutocompleteInput from "../../../Base/BaseAutocompleteInput";
import { AppContext } from "../../../../context/AppContext";

export default function ProductChartCard(props: ICardProps) {
    const size = boxSize["l"];

    const [labels, setLabels] = React.useState<string[]>([]);
    const [dataValues, setDataValues] = React.useState<number[]>([]);
    const [percentOfUsage, setPercentOfUsage] = React.useState<number[]>([]);
    const [search, setSearch] = React.useState<string>("");

    const [products, setProducts] = React.useState<
        { id: string; description: string }[]
    >([]);

    async function getData(searchParam?: string) {
        try {
            const data: {
                name: string;
                maxQuantity: number;
                percentOfUsage: number;
                totalAmount: number;
            }[] = await productByDepositChart(searchParam);

            const products: { id: string; description: string }[] =
                await listProducts();

            setProducts(products);

            setLabels(data.map((produto) => produto.name));
            setDataValues(data.map((produto) => produto.totalAmount));
            setPercentOfUsage(data.map((produto) => produto.percentOfUsage));

            return data;
        } catch (error) {
            return error;
        }
    }

    const { wasTagRead, setWasTagRead } = useContext(AppContext);

    useEffect(() => {
        if (wasTagRead || products.length === 0) {
            getData(search);
            setWasTagRead(false);
        }
    }, [wasTagRead]);

    const handleExportButton = async (searchParam?: string) => {
        try {
            const response = await exportProductByDepositChart(searchParam);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = "produtos-totais.xlsx";
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
                    Produto por Depósito
                </Text>
                <Flex
                    flexDirection='column'
                    gap='1rem'
                    alignItems='flex-end'
                    position='absolute'
                    right={0}
                    top={0}
                >
                    <BaseAutocompleteInput
                        suggestions={products}
                        width='150%'
                        placeholder='Pesquisar'
                        value={search}
                        setValue={(e) => setSearch(e)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                getData(search);
                            }
                        }}
                    />
                    <ButtonExport
                        buttonName='Relatório'
                        width='9rem'
                        hasIcon
                        onClick={() => handleExportButton(search)}
                    />
                </Flex>
            </Flex>
            <BarChart
                labels={labels}
                dataValues={dataValues}
                percentOfUsage={percentOfUsage}
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
