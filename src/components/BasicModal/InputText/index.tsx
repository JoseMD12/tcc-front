import { Flex, Input, Text } from "@chakra-ui/react";
import { Color } from "../../../enum/Color";

interface InputProps {
    label?: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText(props: InputProps) {
    return (
        <>
            <Flex gap='0.5rem' direction='column' w='full'>
                <Text>{props.label}</Text>
                <Input
                    w='full'
                    borderRadius='1rem'
                    boxShadow='lg'
                    backgroundColor='#F1F1F1'
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    _focus={{
                        border: "0.2rem solid",
                        borderColor: Color.focusOrange,
                        boxShadow: "lg",
                    }}
                />
            </Flex>
        </>
    );
}
