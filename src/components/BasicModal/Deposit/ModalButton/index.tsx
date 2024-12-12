import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FontSize } from "../../../../enum/Font";
import { ModalType } from "../../../../enum/ModalType";
import AddModal from "../AddModal";
import RemoveModal from "../RemoveModal";

interface ActionButtonProps {
    label: string;
    icon: ReactNode;
    gap: string;
    modalType: ModalType;
}

export default function ModalButton(props: ActionButtonProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

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

                {(() => {
                    switch (props.modalType) {
                        case ModalType.ADD:
                            return (
                                <AddModal
                                    isOpen={isOpen}
                                    onOpen={onOpen}
                                    onClose={onClose}
                                />
                            );
                        case ModalType.REMOVE:
                            return (
                                <RemoveModal
                                    isOpen={isOpen}
                                    onOpen={onOpen}
                                    onClose={onClose}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </Flex>
        </>
    );
}
