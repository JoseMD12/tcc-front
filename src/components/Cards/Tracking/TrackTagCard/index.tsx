import { Flex, Text, useToast, Tooltip } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import React, { useEffect } from "react";
import ICardProps from "../../ICardProps";
import { boxSize } from "../../../../constants/boxSize";
import {
    findProductInstance,
    listProductInstances,
} from "../../../../services/services";
import { FontSize } from "../../../../enum/Font";
import BaseAutocompleteInput from "../../../Base/BaseAutocompleteInput";

export default function TrackTagCard(props: ICardProps) {
    const size = boxSize["m"];
    const toast = useToast();
    const [search, setSearch] = React.useState<string>("");
    const [tagInfo, setTagInfo] = React.useState<
        {
            label: string;
            value: string;
        }[]
    >([]);
    const [productInstance, setProductInstance] = React.useState<
        {
            id: string;
            description: string;
        }[]
    >([]);

    async function getData() {
        const products: {
            id: string;
            quantity: number;
            FIFO: Date;
            productId: string;
            product: [];
            events: [];
        }[] = await listProductInstances();
        setProductInstance(
            products.map((product) => ({
                id: product.id,
                description: `${product.id} - ${product.productId}`,
            }))
        );
    }

    useEffect(() => {
        getData();
    }, []);

    async function handleSearch(search: string) {
        if (search === "") {
            setTagInfo([]);
            return;
        }

        findProductInstance(search)
            .then(
                (response: {
                    deposit: string;
                    productId: string;
                    productDescription: string;
                    quantity: number;
                }) => {
                    if (response) {
                        setTagInfo([
                            {
                                label: "Código",
                                value: response.productId,
                            },
                            {
                                label: "Produto",
                                value: response.productDescription,
                            },
                            {
                                label: "Quantidade",
                                value: response.quantity.toString(),
                            },
                            {
                                label: "Depósito",
                                value: response.deposit,
                            },
                        ]);
                    } else {
                        setTagInfo([]);
                        toast({
                            title: "Erro ao buscar etiqueta",
                            description: "Etiqueta não encontrada.",
                            status: "error",
                            duration: 4000,
                            isClosable: true,
                            position: "top-right",
                        });
                    }
                }
            )
            .catch(() => {
                setTagInfo([]);
                toast({
                    title: "Erro ao buscar etiqueta",
                    description: "Etiqueta não encontrada.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    }

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
                Pesquisa Por Etiqueta
            </Text>
            <Flex w='full' h='full' px='3rem' direction='column' align='center'>
                {/* <BaseInput
                    width='full'
                    placeholder='Nº Etiqueta'
                    hasIcon
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(search);
                        }
                    }}
                /> */}

                <BaseAutocompleteInput
                    suggestions={productInstance}
                    width='full'
                    placeholder='Pesquisar'
                    value={search}
                    setValue={(e) => setSearch(e)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(search.split("-")[0].trim());
                        }
                    }}
                />

                {tagInfo.length <= 0 ? (
                    <Flex
                        direction='row'
                        h='full'
                        align='center'
                        justifyContent='center'
                    >
                        <Flex
                            borderRadius='0.8rem'
                            boxShadow='lg'
                            px='1rem'
                            py='0.5rem'
                            _hover={{
                                bg: "rgba(233, 113, 50, 0.25)",
                            }}
                        >
                            <Text>Etiqueta Não Encontrada!</Text>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex w='70%' h='full' pt='1rem' direction='column'>
                        {tagInfo.map((data, index) => (
                            <Flex
                                key={index}
                                direction='row'
                                h='full'
                                w='full'
                                align='center'
                                justifyContent='space-between'
                            >
                                <Flex
                                    borderRadius='0.8rem'
                                    boxShadow='lg'
                                    w='7rem'
                                    justifyContent='center'
                                    py='0.5rem'
                                    _hover={{
                                        bg: "rgba(233, 113, 50, 0.25)",
                                    }}
                                >
                                    <Text>{data.label}</Text>
                                </Flex>
                                <Flex w='7rem' isTruncated>
                                    <Tooltip label={data.value}>
                                        {data.value}
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                )}
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
