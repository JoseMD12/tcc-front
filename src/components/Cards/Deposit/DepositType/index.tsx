import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { LuInfo } from "react-icons/lu";
import React, { useEffect } from "react";
import ICardProps from "../../ICardProps";
import { boxSize } from "../../../../constants/boxSize";
import { listDeposits } from "../../../../services/services";
import { FontSize, FontWeight } from "../../../../enum/Font";

export default function DepositType(props: ICardProps) {
    const size = boxSize["s"];
    const [data, setData] = React.useState([
        {
            type: "Registro",
            enumType: "REGISTRATION",
            description:
                "Onde é feito o registro de entrada de produtos no estoque.",
            count: 0,
        },
        {
            type: "Transporte",
            enumType: "TRANSPORTATION",
            description:
                "Este tipo de depósito se refere ao transporte de produtos entre depósitos. Pode ser feito por meio de veículos próprios ou terceirizados.",
            count: 0,
        },
        {
            type: "Depósito",
            enumType: "DEPOSIT",
            description:
                "O depósito é o local onde os produtos são armazenados. Pode ser feito em prateleiras, gôndolas, pallets, entre outros.",
            count: 0,
        },
        {
            type: "Expedição",
            enumType: "DESTINATION",
            description:
                "Onde é feito o registro de saída de produtos do estoque.",
            count: 0,
        },
    ]);

    async function getData() {
        const dataResponse = await listDeposits();
        const updatedData = data.map((item) => ({
            ...item,
            count: dataResponse.filter(
                (response: { type: string }) => response.type === item.enumType
            ).length,
        }));
        setData(updatedData);
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
                Tipos de Depósito
            </Text>
            <Flex
                w='full'
                h='full'
                px='5rem'
                gap='1rem'
                direction='column'
                justifyContent='center'
                align='center'
            >
                {data.map((item, index) => (
                    <Flex key={index} gap='0.5rem'>
                        <Text
                            fontSize={FontSize["regular"]}
                            fontWeight={FontWeight["regular"]}
                            borderRadius='0.8rem'
                            boxShadow='lg'
                            w='15rem'
                            justifyContent='center'
                            align='center'
                            py='0.5rem'
                            _hover={{
                                bg: "rgba(233, 113, 50, 0.25)",
                            }}
                        >
                            {item.count + " Depósito(s) do tipo"}
                        </Text>
                        <Text
                            fontSize={FontSize["regular"]}
                            fontWeight={FontWeight["regular"]}
                            borderRadius='0.8rem'
                            boxShadow='lg'
                            w='7rem'
                            justifyContent='center'
                            align='center'
                            py='0.5rem'
                            _hover={{
                                bg: "rgba(233, 113, 50, 0.25)",
                            }}
                        >
                            {item.type}
                        </Text>
                        <Tooltip label={item.description}>
                            <Flex
                                fontSize={FontSize["regular"]}
                                align='center'
                                color='rgb(233, 113, 50)'
                            >
                                <LuInfo />
                            </Flex>
                        </Tooltip>
                        {/* <Text fontSize={FontSize["regular"]}>
                            {item.description}
                        </Text> */}
                    </Flex>
                ))}
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
