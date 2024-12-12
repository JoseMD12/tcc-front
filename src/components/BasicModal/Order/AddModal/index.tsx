import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { Color } from "../../../../enum/Color";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { RiSave2Line } from "react-icons/ri";
import { listProducts, orderRegister } from "../../../../services/services";
import BaseAutocompleteInput from "../../../Base/BaseAutocompleteInput";
import BaseDateInput from "../../../Base/BaseDateInput";
import BaseInput from "../../../Base/BaseInput";
import { LuTrash } from "react-icons/lu";

interface AddModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function AddModal(props: AddModalProps) {
    const [orderDate, setOrderDate] = useState("");
    const [productList, setProductList] = useState<
        {
            productId: string;
            quantity: string;
        }[]
    >([
        {
            productId: "",
            quantity: "",
        },
    ]);
    const [products, setProducts] = useState<
        { id: string; description: string }[]
    >([]);
    const toast = useToast();

    async function getData() {
        try {
            const response: { id: string; description: string }[] =
                await listProducts();

            setProducts(response);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            getData();
        }
    }, [props.isOpen]);

    const handleClick = () => {
        if (!orderDate || productList.length === 0) {
            toast({
                title: "Erro ao adicionar pedidos",
                description:
                    "A data e os produtos do pedidos são obrigatórios.",
                status: "error",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        const newList = [
            ...productList,
            {
                productId: "",
                quantity: "",
            },
        ];

        setProductList(newList);
    };

    const handleDelete = (index: number) => {
        const newProductList = productList.filter((_, i) => i !== index);

        if (newProductList.length === 0)
            newProductList.push({
                productId: "",
                quantity: "",
            });

        setProductList(newProductList);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleClick();
        }
    };

    async function addOrder(order: {
        orderDate: string;
        products: { productId: string; quantity: string }[];
    }) {
        try {
            const newOrder = {
                orderDate: order.orderDate,
                products: order.products.map((product) => ({
                    productId: product.productId,
                    quantity: Number(product.quantity),
                })),
            };

            newOrder.products = newOrder.products.filter(
                (product) => product.productId !== ""
            );

            if (newOrder.products.length === 0) {
                toast({
                    title: "Erro ao adicionar o pedido",
                    description: "Não há produtos no pedido.",
                    status: "error",
                    duration: 10000,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            const response = await orderRegister(newOrder);
            toast({
                title: "Sucesso!",
                description: "Produtos adicionados com sucesso.",
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return response.data;
        } catch (error) {
            toast({
                title: "Erro ao adicionar o pedido",
                description: "Ocorreu um erro ao adicionar os produtos.",
                status: "error",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return error;
        }
    }

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onClose={props.onClose}
                isCentered={true}
                scrollBehavior='inside'
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent backgroundColor='#F1F1F1'>
                    <ModalHeader>Adicionar Pedidos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            w='full'
                            h='full'
                            direction='column'
                            gap='2rem'
                            mb='1rem'
                            onKeyDown={handleKeyPress}
                        >
                            <BaseDateInput
                                value={orderDate}
                                onChange={(value) => setOrderDate(value)}
                                onClick={() => {}}
                                label='Data do Pedido'
                                width='full'
                            />

                            {productList.map((order, index) => (
                                <Flex direction='column' w='full' key={index}>
                                    <Flex
                                        direction='row'
                                        w='full'
                                        justify='space-between'
                                    >
                                        <BaseAutocompleteInput
                                            label={`${index + 1}º Produto`}
                                            value={order.productId}
                                            setValue={(e) => {
                                                const newObj = {
                                                    productId: e,
                                                    quantity:
                                                        productList[index]
                                                            .quantity,
                                                };
                                                const newProductList =
                                                    productList.map(
                                                        (product, i) => {
                                                            if (i === index) {
                                                                return newObj;
                                                            }
                                                            return product;
                                                        }
                                                    );

                                                setProductList(newProductList);
                                            }}
                                            placeholder='Produto'
                                            width='40%'
                                            suggestions={products}
                                        />

                                        <BaseInput
                                            value={order.quantity}
                                            onChange={(e) => {
                                                const newObj = {
                                                    productId:
                                                        productList[index]
                                                            .productId,
                                                    quantity: e.target.value,
                                                };
                                                const newProductList =
                                                    productList.map(
                                                        (product, i) => {
                                                            if (i === index) {
                                                                return newObj;
                                                            }
                                                            return product;
                                                        }
                                                    );

                                                setProductList(newProductList);
                                            }}
                                            label='Quantidade'
                                            width='40%'
                                        />

                                        <Flex
                                            w='10%'
                                            justifyContent='center'
                                            align='flex-end'
                                            pb='1rem'
                                        >
                                            <Flex
                                                _hover={{
                                                    backgroundColor:
                                                        Color["focusOrange"],
                                                    borderRadius: "0.5rem",
                                                }}
                                                cursor={"pointer"}
                                            >
                                                <LuTrash
                                                    onClick={() =>
                                                        handleDelete(index)
                                                    }
                                                />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))}

                            <Flex w='50%'>
                                <Button
                                    leftIcon={<FaPlus />}
                                    backgroundColor={Color["gray"]}
                                    boxShadow='lg'
                                    onClick={handleClick}
                                    mb='1rem'
                                    isDisabled={
                                        !orderDate || productList.length === 0
                                    }
                                >
                                    Adicionar
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            leftIcon={<RiSave2Line />}
                            colorScheme='orange'
                            mr={3}
                            onClick={() => {
                                if (productList.length > 0 && orderDate) {
                                    addOrder({
                                        orderDate: orderDate,
                                        products: productList,
                                    });
                                    props.onClose();
                                    setOrderDate(
                                        new Date().toISOString().split("T")[0]
                                    );
                                    setProductList([
                                        {
                                            productId: "",
                                            quantity: "",
                                        },
                                    ]);
                                } else {
                                    toast({
                                        title: "Não há pedidos para adicionar",
                                        description:
                                            "Adicione pedidos para salvar.",
                                        status: "error",
                                        duration: 10000,
                                        isClosable: true,
                                        position: "top-right",
                                    });
                                }
                            }}
                        >
                            Salvar
                        </Button>

                        <Button
                            onClick={() => {
                                setOrderDate(
                                    new Date().toISOString().split("T")[0]
                                );
                                setProductList([
                                    {
                                        productId: "",
                                        quantity: "",
                                    },
                                ]);
                                props.onClose();
                            }}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
