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
import { listProducts, removeProducts } from "../../../../services/services";
import { LuTrash } from "react-icons/lu";

interface RemoveModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function RemoveModal(props: RemoveModalProps) {
    const [productSearch, setProductSearch] = useState("");
    const [products, setProducts] = useState<
        { id: string; description: string }[]
    >([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const toast = useToast();

    async function getProducts() {
        try {
            const response = await listProducts();
            setProducts(response);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            getProducts();
            setSelectedItems(selectedItems);
        }
    }, [selectedItems, props.isOpen]);

    const filteredItems = products.filter(
        (product) =>
            product.id.includes(productSearch) ||
            product.description
                .toLowerCase()
                .includes(productSearch.toLowerCase())
    );

    async function removeProductsById(id: string[]) {
        try {
            const response = await removeProducts(id);
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
                                value={productSearch}
                                placeholder='Digite o código ou descrição do produto'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setProductSearch(e.target.value)}
                            />

                            <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                                {filteredItems.map((product) => (
                                    <DescriptionCard
                                        key={product.id}
                                        label={product.id}
                                        description1={product.description}
                                        isCreation={false}
                                        isSelected={selectedItems.includes(
                                            product.id
                                        )}
                                        onSelect={handleSelectItem}
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
                                    removeProductsById(selectedItems);
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
