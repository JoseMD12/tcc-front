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
import BaseInput from "../../../Base/BaseInput";
import { Color } from "../../../../enum/Color";
import { FaPlus } from "react-icons/fa6";
import DescriptionCard from "../../../DescriptionCard";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { RiSave2Line } from "react-icons/ri";
import {
    depositRegister,
    listDepositTypes,
} from "../../../../services/services";
import BaseSelect from "../../../Base/BaseSelect";

interface AddModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function AddModal(props: AddModalProps) {
    const [depositName, setDepositName] = useState("");
    const [depositType, setDepositType] = useState("");
    const [depositMaxQuantity, setDepositMaxQuantity] = useState("");
    const [descriptionCardsList, setDescriptionCardsList] = useState<
        { name: string; type: string; maxQuantity: string }[]
    >([]);
    const toast = useToast();
    const [depositTypes, setDepositTypes] = useState<
        { enum: string; description: string }[]
    >([]);

    async function getData() {
        const data: { enum: string; description: string }[] =
            await listDepositTypes();

        setDepositTypes(data);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleClick = () => {
        if (depositName === "" || depositType === "") {
            toast({
                title: "Erro ao adicionar depósito",
                description: "O nome e o tipo do depósito são obrigatórios.",
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
                name: depositName,
                type: depositType,
                maxQuantity: depositMaxQuantity,
            },
        ];

        setDescriptionCardsList(newList);

        setDepositName("");
        setDepositType("");
        setDepositMaxQuantity("");
    };

    const handleDelete = (index: number) => {
        const newDescriptionCardsList = descriptionCardsList.filter(
            (_, i) => i !== index
        );

        setDescriptionCardsList(newDescriptionCardsList);
    };

    const handleEdit = (index: number) => {
        const descriptionCard = descriptionCardsList[index];
        setDepositName(descriptionCard.name);
        setDepositType(descriptionCard.type);
        setDepositMaxQuantity(descriptionCard.maxQuantity);

        handleDelete(index);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleClick();
        }
    };

    async function addDeposit(
        deposits: { name: string; type: string; maxQuantity: string }[]
    ) {
        try {
            const newDeposits = deposits.map((deposit) => {
                return {
                    name: deposit.name,
                    type: deposit.type,
                    maxQuantity: parseInt(deposit.maxQuantity),
                };
            });
            const response = await depositRegister(newDeposits);
            toast({
                title: "Sucesso!",
                description: "Depósitos adicionados com sucesso.",
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return response.data;
        } catch (error) {
            toast({
                title: "Erro ao adicionar depósito",
                description: "Ocorreu um erro ao adicionar os depósitos.",
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
                    <ModalHeader>Adicionar Depósitos</ModalHeader>
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
                                {descriptionCardsList.map((deposit, index) => (
                                    <DescriptionCard
                                        key={index}
                                        label={deposit.name}
                                        description1={deposit.type}
                                        description2={deposit.maxQuantity.toString()}
                                        isCreation={true}
                                        handleDelete={() => handleDelete(index)}
                                        handleEdit={() => handleEdit(index)}
                                        isSelected={false}
                                        onSelect={() => {}}
                                    />
                                ))}
                            </Grid>

                            <BaseInput
                                label={"Nome do Depósito"}
                                value={depositName}
                                width='full'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setDepositName(e.target.value)}
                            />

                            <BaseInput
                                label={"Quantidade Máxima"}
                                value={depositMaxQuantity}
                                width='full'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (e.target.value.match(/^[0-9]*$/))
                                        setDepositMaxQuantity(e.target.value);
                                }}
                            />
                            <BaseSelect
                                label='Tipo de Depósito'
                                value={depositType}
                                width='full'
                                setValue={setDepositType}
                                options={depositTypes}
                            />
                            <Flex w='50%'>
                                <Button
                                    leftIcon={<FaPlus />}
                                    backgroundColor={Color["gray"]}
                                    boxShadow='lg'
                                    onClick={handleClick}
                                    mb='1rem'
                                    isDisabled={
                                        depositName === "" || depositType === ""
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
                                    addDeposit(descriptionCardsList);
                                    props.onClose();
                                    setDescriptionCardsList([]);
                                } else {
                                    toast({
                                        title: "Não há depósitos para adicionar",
                                        description:
                                            "Adicione depósitos para salvar.",
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
