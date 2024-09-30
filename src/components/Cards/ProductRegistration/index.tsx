import { Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import ICardProps from "../ICardProps";
import { BoxSize } from "../../../enum/BoxSize";
import { FontSize } from "../../../enum/Font";
import { FaPlus } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";
import OpenModalButton from "../../OpenModalButton";
import { ModalType } from "../../../enum/ModalType";

export default function ProductRegistration(props: ICardProps) {
    const size = BoxSize["s"];

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
                <OpenModalButton
                    gap='2rem'
                    label='Adicionar Produtos em Lote'
                    icon={<FaPlus />}
                    modalType={ModalType.ADD}
                />

                <OpenModalButton
                    gap='2rem'
                    label='Remover Produtos em Lote'
                    icon={<LuTrash />}
                    modalType={ModalType.REMOVE}
                />

                <OpenModalButton
                    gap='2rem'
                    label='Exportar para Excel'
                    icon={<RiFileExcel2Fill />}
                    modalType={ModalType.EXCEL}
                />
            </Flex>
            <Flex
                alignSelf='flex-end'
                fontSize={FontSize["bookMark"]}
                color='rgb(233, 113, 50)'
                _hover={{
                    cursor: "pointer",
                    color: "rgba(233, 113, 50, 0.5)",
                }}
            >
                {props.isSaved ? <BsBookmarkFill /> : <BsBookmark />}
            </Flex>
        </Flex>
    );
}
