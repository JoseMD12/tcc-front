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
} from "@chakra-ui/react";
import InputText from "../../../Base/BaseInput";
import { Color } from "../../../../enum/Color";
import { FaPlus } from "react-icons/fa6";
import DescriptionCard from "../../../DescriptionCard";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { RiSave2Line } from "react-icons/ri";
import { productRegister } from "../../../../services/services";

interface AddModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function AddModal(props: AddModalProps) {
    const [productCode, setProductCode] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [descriptionCardsList, setDescriptionCardsList] = useState<
        { id: string; description: string }[]
    >([]);
    const toast = useToast();

    const forms = [
        {
            label: "Código do Produto",
            value: productCode,
            setValue: setProductCode,
        },
        {
            label: "Descrição do Produto",
            value: productDescription,
            setValue: setProductDescription,
        },
    ];

    const handleClick = () => {
        if (productCode === "" || productDescription === "") {
            toast({
                title: "Erro ao adicionar produto",
                description:
                    "O código e a descrição do produto são obrigatórios.",
                status: "error",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        const newList = [
            ...descriptionCardsList,
            {
                id: productCode,
                description: productDescription,
            },
        ];

        setDescriptionCardsList(newList);

        setProductCode("");
        setProductDescription("");
    };

    const handleDelete = (index: number) => {
        const newDescriptionCardsList = descriptionCardsList.filter(
            (_, i) => i !== index
        );

        setDescriptionCardsList(newDescriptionCardsList);
    };

    const handleEdit = (index: number) => {
        const descriptionCard = descriptionCardsList[index];
        setProductCode(descriptionCard.id);
        setProductDescription(descriptionCard.description);

        handleDelete(index);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleClick();
        }
    };

    async function addProduct(products: { id: string; description: string }[]) {
        try {
            const response = await productRegister(products);
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
                title: "Erro ao adicionar produto",
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
                    <ModalHeader>Adicionar Produtos</ModalHeader>
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
                            <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                                {descriptionCardsList.map((product, index) => (
                                    <DescriptionCard
                                        key={index}
                                        label={product.id}
                                        description1={product.description}
                                        isCreation={true}
                                        handleDelete={() => handleDelete(index)}
                                        handleEdit={() => handleEdit(index)}
                                        isSelected={false}
                                        onSelect={() => {}}
                                    />
                                ))}
                            </Grid>

                            {forms.map((form, index) => (
                                <InputText
                                    key={index}
                                    label={form.label}
                                    value={form.value}
                                    width='full'
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => form.setValue(e.target.value)}
                                />
                            ))}
                            <Flex w='50%'>
                                <Button
                                    leftIcon={<FaPlus />}
                                    backgroundColor={Color["gray"]}
                                    boxShadow='lg'
                                    onClick={handleClick}
                                    mb='1rem'
                                    isDisabled={
                                        productCode === "" ||
                                        productDescription === ""
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
                                if (descriptionCardsList.length > 0) {
                                    addProduct(descriptionCardsList);
                                    props.onClose();
                                    setDescriptionCardsList([]);
                                } else {
                                    toast({
                                        title: "Não há produtos para adicionar",
                                        description:
                                            "Adicione produtos para salvar.",
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

                        <Button onClick={props.onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
