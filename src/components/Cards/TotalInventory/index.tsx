import { Box, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import ICardProps from "../ICardProps";
import { BoxSize } from "../../../enum/BoxSize";
import { FontSize } from "../../../enum/Font";

export default function TotalInventory(props: ICardProps) {
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
                Inventário Total
            </Text>
            <Flex w='full' h='full' px='3rem' mt='0.75rem' direction={"column"}>
                {/* Chart goes here */}
                <Flex
                    w='full'
                    h='auto'
                    pt='0.5rem'
                    alignItems={"center"}
                    gap={"0.75rem"}
                >
                    <Text fontSize={FontSize["largeInfo"]} fontWeight={"bold"}>
                        15.700
                    </Text>
                    <Text fontSize={FontSize["regular"]}>Produtos Totais</Text>
                </Flex>
                <Flex
                    w='full'
                    h='auto'
                    pt='1.7rem'
                    alignItems={"center"}
                    gap={"0.75rem"}
                >
                    <Text fontSize={FontSize["largeInfo"]} fontWeight={"bold"}>
                        150
                    </Text>
                    <Box
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
                        <RiFileExcel2Fill />
                    </Box>
                    <Text fontSize={FontSize["regular"]}>
                        Itens sem Registro
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
            >
                {props.isSaved ? <BsBookmarkFill /> : <BsBookmark />}
            </Flex>
        </Flex>
    );
}
