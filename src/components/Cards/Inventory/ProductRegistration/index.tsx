import { Button, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";
import { boxSize } from "../../../../constants/boxSize";
import { exportProductsExcel } from "../../../../services/services";
import ICardProps from "../../ICardProps";
import { ModalType } from "../../../../enum/ModalType";
import ModalButton from "../../../BasicModal/Inventory/ModalButton";
import { FontSize } from "../../../../enum/Font";

export default function ProductRegistration(props: ICardProps) {
    const size = boxSize["s"];

    const handleExportButton = () => {
        exportProductsExcel()
            .then(async (response) => {
                // const blob = await response.blob();
                const url = window.URL.createObjectURL(response);
                const link = document.createElement("a");
                link.href = url;
                link.download = "produtos.xlsx";
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                Registro de Produtos
            </Text>
            <Flex
                w='full'
                h='full'
                px='5.5rem'
                gap='1rem'
                direction='column'
                justifyContent='center'
            >
                <ModalButton
                    gap='2rem'
                    label='Adicionar Produtos em Lote'
                    icon={<FaPlus />}
                    modalType={ModalType.ADD}
                />

                <ModalButton
                    gap='2rem'
                    label='Remover Produtos em Lote'
                    icon={<LuTrash />}
                    modalType={ModalType.REMOVE}
                />

                <Flex w='full' alignItems='center' justifyContent='left'>
                    <Button
                        boxShadow='base'
                        backgroundColor='rgba(241, 241, 241, 0.25)'
                        borderRadius='0.5rem'
                        color='rgb(233, 113, 50)'
                        size={size.height}
                        _hover={{
                            cursor: "pointer",
                            bg: "rgba(233, 113, 50, 0.25)",
                        }}
                        gap='2rem'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        boxSize='2.5rem'
                        onClick={() => handleExportButton()}
                    >
                        <RiFileExcel2Fill />
                    </Button>

                    <Text fontSize={FontSize["regular"]} pl='2rem'>
                        Exportar Produtos
                    </Text>
                </Flex>
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
