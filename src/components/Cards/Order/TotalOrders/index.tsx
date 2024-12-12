import { Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import React, { useEffect } from "react";
import ICardProps from "../../ICardProps";
import { boxSize } from "../../../../constants/boxSize";
import { FontSize } from "../../../../enum/Font";
import { totalOrders } from "../../../../services/services";

export default function TotalOrders(props: ICardProps) {
    const size = boxSize["s"];
    const [totalOrdersCount, setTotalOrdersCount] = React.useState<number>(0);
    const [tomorrowOrdersCount, setTomorrowOrdersCount] =
        React.useState<number>(0);

    async function getData() {
        try {
            const data: {
                total: number;
                tomorrow: number;
            } = await totalOrders();
            setTotalOrdersCount(data.total);
            setTomorrowOrdersCount(data.tomorrow);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getData();
    }, []);

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
                        {totalOrdersCount}
                    </Text>
                    <Text fontSize={FontSize["regular"]}>Pedidos Totais</Text>
                </Flex>
                <Flex
                    w='full'
                    h='auto'
                    pt='1.7rem'
                    alignItems={"center"}
                    gap={"0.75rem"}
                >
                    <Text fontSize={FontSize["largeInfo"]} fontWeight={"bold"}>
                        {tomorrowOrdersCount}
                    </Text>
                    <Text fontSize={FontSize["regular"]} pl='1rem'>
                        Pedidos para o próximo dia
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
