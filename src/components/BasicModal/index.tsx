import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { ModalType } from "../../enum/ModalType";
import { RiSave2Line } from "react-icons/ri";
import { ProductDTO } from "../../dtos/ProductDTO";
import { LuTrash } from "react-icons/lu";

interface BasicModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    label: string;
    modalType: ModalType;
    addItemsList?: ProductDTO[];
    removeItemsList?: [];
    children?: React.ReactNode;
}

export default function BasicModal(props: BasicModalProps) {
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
                    <ModalHeader>{props.label}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{props.children}</ModalBody>
                    <ModalFooter>
                        {props.modalType === ModalType.ADD ? (
                            <Button
                                leftIcon={<RiSave2Line />}
                                colorScheme='orange'
                                mr={3}
                                onClick={() => {
                                    console.log(
                                        "Adicionando itens",
                                        props.addItemsList
                                    );
                                }}
                            >
                                Salvar
                            </Button>
                        ) : (
                            <Button
                                leftIcon={<LuTrash />}
                                colorScheme='orange'
                                mr={3}
                                onClick={() => {
                                    console.log(
                                        "Removendo itens",
                                        props.removeItemsList
                                    );
                                }}
                            >
                                Remover
                            </Button>
                        )}

                        <Button onClick={props.onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
