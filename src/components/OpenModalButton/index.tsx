import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FontSize } from "../../enum/Font";
import BasicModal from "../BasicModal";
import { ModalType } from "../../enum/ModalType";
import AddModal from "../BasicModal/AddModal";
import RemoveModal from "../BasicModal/RemoveModal";
import { ProductDTO } from "../../dtos/ProductDTO";

interface ActionButtonProps {
    label: string;
    icon: ReactNode;
    gap: string;
    modalType: ModalType;
}

export default function OpenModalButton(props: ActionButtonProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [descriptionCardsList, setDescriptionCardsList] = useState<
        ProductDTO[]
    >([]);

    return (
        <>
            <Flex alignItems='center' gap={props.gap}>
                <Box
                    onClick={onOpen}
                    boxShadow='base'
                    backgroundColor='rgba(241, 241, 241, 0.25)'
                    boxSize='2.5rem'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='0.5rem'
                    color='rgb(233, 113, 50)'
                    _hover={{
                        cursor: "pointer",
                        bg: "rgba(233, 113, 50, 0.25)",
                    }}
                >
                    {props.icon}
                </Box>

                <Text fontSize={FontSize["regular"]}>{props.label}</Text>
                {
                    <BasicModal
                        key={props.label}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        label={props.label}
                        addItemsList={descriptionCardsList}
                        modalType={props.modalType}
                    >
                        {props.modalType === ModalType.ADD ? (
                            <AddModal
                                descriptionCardsList={descriptionCardsList}
                                setDescriptionCardsList={
                                    setDescriptionCardsList
                                }
                            />
                        ) : (
                            <RemoveModal
                                descriptionCardsList={descriptionCardsList}
                                setDescriptionCardsList={
                                    setDescriptionCardsList
                                }
                            />
                        )}
                    </BasicModal>
                }
            </Flex>
        </>
    );
}
