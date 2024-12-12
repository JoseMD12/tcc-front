import { Button, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import React, { useEffect } from "react";
import { boxSize } from "../../../../constants/boxSize";
import ICardProps from "../../ICardProps";
import {
    exportProductInstancesExcel,
    totalInventory,
} from "../../../../services/services";
import { FontSize } from "../../../../enum/Font";

export default function TotalInventory(props: ICardProps) {
    const size = boxSize["s"];
    const [productsCount, setProductsCount] = React.useState<number>(0);
    const [productInstanceCount, setProductInstanceCount] =
        React.useState<number>(0);

    async function getData() {
        try {
            const data: {
                registeredProducts: number;
                circulationTags: number;
            } = await totalInventory();

            setProductsCount(data.registeredProducts);
            setProductInstanceCount(data.circulationTags);
        } catch (error) {
            return error;
        }
    }

    async function handleExportButton() {
        try {
            const response = await exportProductInstancesExcel();
            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = "produtos-em-circulacao.xlsx";
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();

        const interval = setInterval(() => {
            getData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
            <Text fontSize={FontSize["subtitle"]} fontWeight='bold'>
                Inventário Total
            </Text>
            <Flex w='full' h='full' px='3rem' mt='0.75rem' direction={"column"}>
                {/* Chart goes here */}
                <Flex
                    w='full'
                    h='auto'
                    pt='0.5rem'
                    alignItems={"center"}
                    gap={"0.75rem"}
                >
                    <Text fontSize={FontSize["largeInfo"]} fontWeight={"bold"}>
                        {productsCount}
                    </Text>
                    <Text fontSize={FontSize["regular"]}>
                        Produtos Cadastrados
                    </Text>
                </Flex>
                <Flex
                    w='full'
                    h='auto'
                    pt='1.7rem'
                    alignItems={"center"}
                    gap={"0.75rem"}
                >
                    <Text fontSize={FontSize["largeInfo"]} fontWeight={"bold"}>
                        {productInstanceCount}
                    </Text>
                    <Flex w='full' alignItems='center' justifyContent='left'>
                        <Button
                            boxShadow='base'
                            backgroundColor='rgba(241, 241, 241, 0.25)'
                            borderRadius='0.5rem'
                            color='rgb(233, 113, 50)'
                            size={size.height}
                            _hover={{
                                cursor: "pointer",
                                bg: "rgba(233, 113, 50, 0.25)",
                            }}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            boxSize='2.5rem'
                            onClick={() => handleExportButton()}
                        >
                            <RiFileExcel2Fill />
                        </Button>

                        <Text fontSize={FontSize["regular"]} pl='1rem'>
                            Etiquetas em Circulação
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
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
