import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FontSize } from "../../../enum/Font";

interface OptionMenuProps {
    label: string;
    icon: ReactNode;
    isActive: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function OptionMenu(props: OptionMenuProps) {
    return (
        <>
            <Flex
                h='4.5rem'
                w='10.5rem'
                pl='1.2rem'
                alignItems='center'
                alignContent='center'
                onClick={props.onClick}
                cursor='pointer'
                backgroundColor={
                    props.isActive ? "rgba(233, 113, 50, 0.15)" : "transparent"
                }
                borderRightRadius='5rem'
                color={props.isActive ? "rgb(233, 113, 50)" : "inherit"}
                border={
                    props.isActive ? "0.12rem solid rgb(233, 113, 50)" : "none"
                }
                borderLeft={props.isActive ? "none" : "inherit"}
                fontWeight='semibold'
                gap='0.75rem'
            >
                <Flex h='full' alignItems='center' fontSize={FontSize["menu"]}>
                    {props.icon}
                </Flex>
                <Text fontWeight='semibold' fontSize={FontSize["regular"]}>
                    {props.label}
                </Text>
            </Flex>
        </>
    );
}
