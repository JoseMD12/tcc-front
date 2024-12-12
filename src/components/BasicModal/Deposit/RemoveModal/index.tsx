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
import {
    listDeposits,
    listDepositTypes,
    removeDeposits,
} from "../../../../services/services";
import { LuTrash } from "react-icons/lu";

interface RemoveModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function RemoveModal(props: RemoveModalProps) {
    const [depositSearch, setDepositSearch] = useState("");
    const [deposits, setDeposits] = useState<
        { id: string; name: string; type: string; maxQuantity: number }[]
    >([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const toast = useToast();

    async function getDeposits() {
        try {
            const response: {
                id: string;
                name: string;
                type: string;
                maxQuantity: number;
            }[] = await listDeposits();
            const depositsType: { enum: string; description: string }[] =
                await listDepositTypes();

            response.forEach((deposit) => {
                deposit.type =
                    depositsType.find((type) => type.enum === deposit.type)
                        ?.description || deposit.type;
            });
            setDeposits(response);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            getDeposits();
            setSelectedItems(selectedItems);
        }
    }, [selectedItems, props.isOpen]);

    const filteredItems = deposits.filter(
        (product) =>
            product.type.toLowerCase().includes(depositSearch.toLowerCase()) ||
            product.name.toLowerCase().includes(depositSearch.toLowerCase())
    );

    async function removeDepositsById(id: string[]) {
        try {
            const response = await removeDeposits(id);
            toast({
                title: "Sucesso!",
                description: "Depósitos removidos com sucesso.",
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return response.data;
        } catch (error) {
            toast({
                title: "Erro!",
                description: "Não foi possível remover os depósitos.",
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
                    <ModalHeader>Remover Depósitos</ModalHeader>
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
                                value={depositSearch}
                                placeholder='Digite o código ou descrição do depósitos'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setDepositSearch(e.target.value)}
                            />

                            <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                                {filteredItems.map((deposit) => (
                                    <DescriptionCard
                                        key={deposit.id}
                                        label={deposit.name}
                                        description1={deposit.type}
                                        description2={deposit.maxQuantity.toString()}
                                        isCreation={false}
                                        isSelected={selectedItems.includes(
                                            deposit.id
                                        )}
                                        onSelect={() =>
                                            handleSelectItem(deposit.id)
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
                                    removeDepositsById(selectedItems);
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
