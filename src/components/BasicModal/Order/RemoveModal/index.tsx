import {
    Button,
    Flex,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import DescriptionCard from "../../../DescriptionCard";
import InputText from "../../../Base/BaseInput";
import { useEffect, useState } from "react";
import { listOrders, removeOrders } from "../../../../services/services";
import { LuTrash } from "react-icons/lu";

interface RemoveModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function RemoveModal(props: RemoveModalProps) {
    const [orderSearch, setOrderSearch] = useState("");
    const [orders, setOrders] = useState<
        {
            id: string;
            orderDate: string;
            products: { id: string; quantity: number; productId: string }[];
        }[]
    >([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const toast = useToast();

    async function getData() {
        try {
            const response: {
                id: string;
                orderDate: string;
                products: { id: string; quantity: number; productId: string }[];
            }[] = await listOrders();
            setOrders(response);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            getData();
            setSelectedItems(selectedItems);
        }
    }, [selectedItems, props.isOpen]);

    const filteredItems = orders.filter(
        (order) =>
            order.orderDate.includes(orderSearch) ||
            order.products.some((product) => product.id.includes(orderSearch))
    );

    async function removeOrdersById(id: string[]) {
        try {
            const response = await removeOrders(id);
            toast({
                title: "Sucesso!",
                description: "Produtos removidos com sucesso.",
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return response.data;
        } catch (error) {
            toast({
                title: "Erro!",
                description: "Não foi possível remover os itens.",
                status: "error",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return error;
        }
    }

    function handleSelectItem(id: string) {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter((item) => item !== id);
            } else {
                return [...prevSelectedItems, id];
            }
        });
    }

    function transformDateFormat(inputDate: string) {
        const onlyDate = inputDate.split("T")[0];
        const dateParts = onlyDate.split("-"); // Split the string into parts
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        return `${day}/${month}/${year}`; // Return in "dd/MM/yyyy" format
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
                <ModalContent backgroundColor='#f1f1f1'>
                    <ModalHeader>Remover Produtos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            w='full'
                            h='full'
                            direction='column'
                            gap='2rem'
                            mb='1rem'
                        >
                            <InputText
                                width='100%'
                                value={orderSearch}
                                placeholder='Digite o código ou descrição do produto'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setOrderSearch(e.target.value)}
                            />

                            <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                                {filteredItems.map((order) => (
                                    <DescriptionCard
                                        key={order.id}
                                        label={transformDateFormat(
                                            order.orderDate
                                        )}
                                        description1={
                                            order.products.length.toString() +
                                            " produto(s)"
                                        }
                                        isCreation={false}
                                        isSelected={selectedItems.includes(
                                            order.id
                                        )}
                                        onSelect={() =>
                                            handleSelectItem(order.id)
                                        }
                                    />
                                ))}
                            </Grid>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            leftIcon={<LuTrash />}
                            colorScheme='orange'
                            mr={3}
                            onClick={() => {
                                if (selectedItems.length > 0) {
                                    removeOrdersById(selectedItems);
                                    props.onClose();
                                    setSelectedItems([]);
                                }
                            }}
                        >
                            Remover
                        </Button>
                        <Button
                            onClick={() => {
                                props.onClose();
                                setSelectedItems([]);
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
